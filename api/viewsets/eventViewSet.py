from rest_framework import viewsets
from api.models import Events
from api.serializers.eventsSerializer import EventsListSerializer, EventsSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.settings import api_settings
from django_filters.rest_framework import DjangoFilterBackend
from api.permissions import IsAdmin, SoloLectura

class EventViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("date",)
    search_fields = ("title",)
    permission_classes = (IsAuthenticated, IsAdmin|SoloLectura)

    def get_serializer_class(self):
        if self.action == 'create':
            return EventsSerializer
        else:
            return EventsListSerializer
    
    def get_queryset(self):
        return Events.objects.filter(state=True)
