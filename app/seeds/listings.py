from app.models import db, Listing
from faker import Faker
import json
fake = Faker()
# Adds a demo user, you can add other users here if you want


def seed_listings():

    with open('./app/seeds/gameData.json', 'r') as f:
        contents = f.readlines()

    ind = 0
    # remove any adult games from game list from steam

    formattedGameData = list(set(contents))

    for s in formattedGameData:
        ind += 1
        gameData = json.loads(s)

        try:
            game = Listing(
                name=gameData["name"],
                description=gameData["description"][:499],
                image_urls=str(gameData["image_urls"]),
                video_url=gameData["video_url"],
                price=gameData["price"][1:],
                owner_id=(1 + ind//9)
            )
            db.session.add(game)
            db.session.commit()
        except Exception as e:
            print(e)


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_listings():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
