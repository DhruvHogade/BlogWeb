from django.db import models
import uuid
from account.models import User  

class Blog(models.Model):
    CATEGORY_CHOICES = [
        ('Technology', 'Technology'),
        ('Fashion', 'Fashion'),
        ('Travel', 'Travel'),
        ('LifeStyle', 'LifeStyle'),
        ('Sports', 'Sports'),
        ('Finance', 'Finance'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='blog_images/')
    content = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs')  
    created_at=models.DateField(auto_now_add=True)
    updated_at=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
