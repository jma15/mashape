from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from standard_functions.database_function import *

import json

@login_required
def music(request):
	# get all the playlist data
	playlist = get_playlist(request.user.username)

	final_result = {}
	final_result['playlist'] = json.dumps(playlist)
	return render(request, 'music/home.html', final_result)

def search_music(request):
	data = json.loads(request.body.decode("utf-8"))
	search = data['search']

	# search for any words that teh searched word
	query = '''
				SELECT * FROM song
				where name like '%%%s%%' or artist like '%%%s%%' or album like '%%%s%%'
			''' %(search, search, search)

	query_result = run_query(query)

	# This is where we query for the data
	return HttpResponse(json.dumps(query_result))

def get_playlist_music(request):
	data = json.loads(request.body.decode("utf-8"))
	playlist_id = data['id']

	# search for all the playlist song
	query = '''
				SELECT song.* FROM playlist_song join song on song.id = playlist_song.song_id
				where playlist_id = '%s'
			''' %(playlist_id)

	query_result = run_query(query)

	return HttpResponse(json.dumps(query_result))

@login_required
def home(request):
	# return HttpResponse("hiii")
	return render(request, 'music/home.html', {})

def get_playlist(username):
	query = '''
				SELECT * from playlist where username = '%s'
			''' %(username)

	query_result = run_query(query)
	return query_result




