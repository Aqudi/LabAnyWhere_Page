from django.db import models

CATEGORY_LIST = (
    ('notice', '공지사항'), 
    ('envs', '표준환경'),
    ('lecture', '기초강의'),
    ('people', '교수진'),
    ('etc', '기타'),
)


class Category(models.Model):
    category = models.CharField(max_length=30, choices=CATEGORY_LIST, default="분류없음")

    def __str__(self):
        return self.category

class Post(models.Model):
    title = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    body = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return self.title
    