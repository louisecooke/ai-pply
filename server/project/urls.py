"""main URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.pages, name='pages')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='pages')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.views import generic
from django.urls import include, path, re_path
from .views import front
from django.conf import settings
from django.conf.urls.static import static

catch = r'\S*'
exclude = fr'(?!^media)(^.*$)'
dynamic = r'(?!^{med})(^.*$)'.format(med=settings.MEDIA_URL)
test = fr'{settings.MEDIA_URL}'

urlpatterns = [
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls),
    #catch all else except media. TODO: dynamic string
    re_path(exclude, front, name='front')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
