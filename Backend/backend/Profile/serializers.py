from rest_framework import serializers
from .models import Profile, User  # Import your models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'tc', 'is_active', 'is_admin', 'is_subscribed', 'created_at']
        read_only_fields = ['email', 'created_at']  # Make email & created_at read-only

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Nested User Data (Depth = 1)

    class Meta:
        model = Profile
        fields = '__all__'  # Include all fields
