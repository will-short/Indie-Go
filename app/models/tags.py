from .db import db


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    action = db.Column(db.Boolean())
    adventure = db.Column(db.Boolean())
    rpg = db.Column(db.Boolean())
    mmo = db.Column(db.Boolean())
    casual = db.Column(db.Boolean())
    sports = db.Column(db.Boolean())
    simulation = db.Column(db.Boolean())
    strategy = db.Column(db.Boolean())
    racing = db.Column(db.Boolean())
    rts = db.Column(db.Boolean())
    horror = db.Column(db.Boolean())
    platformer = db.Column(db.Boolean())
    listing_id = db.Column(db.Integer, db.ForeignKey(
        'listings.id'), nullable=False)

    listings = db.relationship('Listing', back_populates='tags')

    def to_list(self):
        arr = []
        if self.action:
            arr.append("action")
        if self.adventure:
            arr.append("adventure")
        if self.rpg:
            arr.append("rpg")
        if self.mmo:
            arr.append("mmo")
        if self.casual:
            arr.append("casual")
        if self.sports:
            arr.append("sports")
        if self.simulation:
            arr.append("simulation")
        if self.strategy:
            arr.append("strategy")
        if self.racing:
            arr.append("racing")
        if self.rts:
            arr.append("rts")
        if self.horror:
            arr.append("horror")
        if self.platformer:
            arr.append("platformer")

        return arr
