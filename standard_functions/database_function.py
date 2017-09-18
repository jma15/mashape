from django.db import connection

def run_query(query):
    # print query

    # Connect to database and get the data
    with connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor.fetchall()
        # print result

    #return HttpResponse(data, content_type='application/json')
    # Json encode the data back to javascript
    #return HttpResponse(json.dumps(result), content_type='application/json')
    return result