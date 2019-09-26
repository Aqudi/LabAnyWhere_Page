from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Post, Category
from .serializer import PostSerializer, CategorySerializer
from .paginations import PostPagination

# from rest_framework.filters import SearchFilter
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('created_at')
    serializer_class = PostSerializer
    pagination_class = PostPagination

    authentication_classes=[TokenAuthentication]   
    permission_classes=[IsAuthenticatedOrReadOnly]

    # filter_backends = [SearchFilter]
    # search_fields = ('title', 'body', )

class CategoryInfo(APIView):
    def get(self, request, format=None):
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        
        data = dict({
            'category_list': list(map(str, category)),
            'category_info': []
        })
        for i, d in enumerate(serializer.data):
            d.update({
                'total_post':category[i].post_set.count()
                })
            data['category_info'].append(d)
        return Response(data)


class CategoryView(APIView):

    def get(self, request, categoryName, format=None):
        category = get_object_or_404(Category, category=categoryName)
        if(category):
            posts = category.post_set.all()
            serializer = PostSerializer(posts, many=True)

            data = list()
            for i, d in enumerate(serializer.data):
                d.update({
                    'category':category.category
                    })
                data.append(d)
            # print(data)
            return Response(data)
        return Response({})


class Posts(APIView):
    def get(self, request, categoryName='all', format=None):
        posts = Post.objects.all()
        seriallizer = PostSerializer(posts, many=True)
        return Response(seriallizer.data)

        