from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('post', views.PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('posts/', views.Posts.as_view()),
    path('posts/category', views.CategoryInfo.as_view()),
    path('posts/<str:categoryName>', views.CategoryView.as_view()),
]
