from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.response import Response
from rest_framework import status

class ProfileViewSet(viewsets.ModelViewSet):
    """
    API to Create, Update, Delete User Profiles.
    Read-only fields: email, created_at.
    Includes full user details with depth=1.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Restrict users to manage only their own profile."""
        return Profile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Ensure the profile is linked to the logged-in user."""
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        """Allow `PUT` method for updating user profiles."""
        instance = self.get_queryset().first()
        if not instance:
            return Response({"error": "Profile not found"}, status=404)

        serializer = self.get_serializer(instance, data=request.data, partial=True)  
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
