from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import BlogSerializer
from .models import Blog
from django.db.models import Q

class BlogView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        # View blogs by the authenticated user
        blogs = Blog.objects.filter(author=request.user)
        if request.GET.get('search'):
            search = request.GET.get('search')
            blogs = blogs.filter(Q(title__icontains=search) | Q(content__icontains=search))
        serializer = BlogSerializer(blogs, many=True)
        return Response({'data': serializer.data, 'message': 'Blogs fetched successfully'}, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        data['author'] = request.user.id
        serializer = BlogSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'message': 'Blog post created successfully',
                'data': serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        response_data = {
            'message': 'Failed to create blog post',
            'errors': serializer.errors
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            blog = Blog.objects.get(pk=pk, author=request.user)
        except Blog.DoesNotExist:
            return Response({'message': 'Blog not found or not authorized'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BlogSerializer(blog, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Blog updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'Failed to update blog', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            blog = Blog.objects.get(pk=pk, author=request.user)
        except Blog.DoesNotExist:
            return Response({'message': 'Blog not found or not authorized'}, status=status.HTTP_404_NOT_FOUND)
        
        blog.delete()
        return Response({'message': 'Blog deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class PublicBlogView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response({'data': serializer.data, 'message': 'All blogs fetched successfully'}, status=status.HTTP_200_OK)
