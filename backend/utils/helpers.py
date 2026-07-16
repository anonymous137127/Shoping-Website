from bson import ObjectId


def serialize(document):

    if not document:

        return None

    document["_id"] = str(document["_id"])

    return document


def serialize_list(documents):

    result = []

    for doc in documents:

        doc["_id"] = str(doc["_id"])

        result.append(doc)

    return result


def is_valid_objectid(id):

    return ObjectId.is_valid(id)