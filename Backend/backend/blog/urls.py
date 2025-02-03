from django.urls import path
from .views import BlogView, PublicBlogView

urlpatterns = [
    path('blogs/', BlogView.as_view()),
    path('blogs/<str:pk>/', BlogView.as_view()), 
    path('public-blogs/', PublicBlogView.as_view()),  
]
