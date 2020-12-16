from django.db import models
from django.utils import timezone


class MainImage(models.Model):
    """ """
    title = models.CharField('Title', max_length=50)
    date = models.DateTimeField('Date', default=timezone.now)
    file = models.ImageField(upload_to='images')
    comment = models.TextField('Comment', null=True, blank=True)

    class Meta:
        ordering = ['date']

    def __str__(self):
        return f'{self.title}; {self.date}'
