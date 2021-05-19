from rest_framework import viewsets
from api.serializers.teachers.teacher_serializers import ProfessionSerialzer, ProfessionListSerialzer
from api.models.teacher import Profession
from rest_framework.response import Response
from rest_framework import status,filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny, IsAuthenticated

class ProfesionsViewset(viewsets.ModelViewSet):
    serializer_class = ProfessionSerialzer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)

    filter_fields = ("created",)
    search_fields = ("name",)
    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return ProfessionListSerialzer
        else:
            return ProfessionSerialzer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return self.get_serializer().Meta.model.objects.filter(state=True)