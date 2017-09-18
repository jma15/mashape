from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.music, name='music'),
	url(r'^search-music$', views.search_music, name='search_music'),
	url(r'^get-playlist-music$', views.get_playlist_music, name='get_playlist_music'),
	url(r'^home$', views.music, name='music')
]
