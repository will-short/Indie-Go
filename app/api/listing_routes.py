from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Listing, db
from app.forms import ListingForm
from app.aws_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from .auth_routes import validation_errors_to_error_messages
import json
listing_routes = Blueprint('listings', __name__)


@listing_routes.route('/')
def listings():
    listings = Listing.query.all()

    return {"listings": {listing.listingId(): listing.to_dict() for listing in listings}}


@listing_routes.route('/<int:listingId>', methods=['DELETE'])
@login_required
def deleteLisiting(listingId):
    listing = Listing.query.get(listingId)
    db.session.delete(listing)
    db.session.commit()
    return listing.to_dict()


@listing_routes.route('/<int:listingId>', methods=['PUT'])
@login_required
def editListing(listingId):
    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    listing = Listing.query.get(listingId)
    video = form.data["video"]
    if video:
        video.filename = get_unique_filename(video.filename)
        videoupload = upload_file_to_s3(video)
        videoURL = videoupload["url"]
        listing.video_url = videoURL

    uploads = [form.data["image1"], form.data["image2"],
               form.data["image3"], form.data["image4"], form.data["image5"]]
    imageURLs = []
    for upload in uploads:
        if upload:
            if type(upload) != str:
                upload.filename = get_unique_filename(upload.filename)
                imageupload = upload_file_to_s3(upload)
                imageURLs.append(imageupload["url"])
            else:
                imageURLs.append(upload)
    listing.image_urls = json.dumps(imageURLs)
    listing.name = form.data["name"]
    listing.description = form.data["description"]
    listing.price = form.data["price"]

    db.session.commit()
    return listing.to_dict()


@listing_routes.route('/', methods=['POST'])
@login_required
def postListing():
    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        video = form.data["video"]
        videoURL = None
        if video:
            video.filename = get_unique_filename(video.filename)
            videoupload = upload_file_to_s3(video)
            videoURL = videoupload["url"]

        uploads = [form.data["image1"], form.data["image2"],
                   form.data["image3"], form.data["image4"], form.data["image5"]]
        imageURLs = []
        for upload in uploads:
            if upload:
                upload.filename = get_unique_filename(upload.filename)
                imageupload = upload_file_to_s3(upload)
                imageURLs.append(imageupload["url"])
        listing = Listing(
            name=form.data["name"],
            description=form.data["description"],
            video_url=videoURL,
            image_urls=json.dumps(imageURLs),
            price=form.data["price"],
            owner_id=current_user.id
        )
        db.session.add(listing)
        db.session.commit()
        return listing.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
