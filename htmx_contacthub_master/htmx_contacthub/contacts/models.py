from django.contrib.auth.models import AbstractUser
from django.db import models

from django.core.validators import FileExtensionValidator
from cloudinary.models import CloudinaryField


class User(AbstractUser):
    pass


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    # Edited field to use Cloudinary
    document = CloudinaryField(
        "document",
        resource_type="raw",  # Use 'raw' for documents like pdf, docx, txt, images
        validators=[
            FileExtensionValidator(["pdf", "doc", "docx", "txt", "jpg", "png"])
        ],
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="contacts",  # lets us do user.contacts.all()
    )

    class Meta:
        unique_together = ("user", "email")

    def __str__(self):
        return f"{self.name} <{self.email}>"
