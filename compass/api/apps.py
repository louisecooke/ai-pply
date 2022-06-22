from django.apps import AppConfig
from material.frontend.apps import ModuleMixin


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'



