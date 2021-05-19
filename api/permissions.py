from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user:
            if request.user.profile.rol.id == 1:
                return True
            else:
                return False
        return False

class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        if request.user:
            if request.user.profile.rol.id == 2:
                return True
            else:
                return False
        return False

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        if request.user:
            if request.user.profile.rol.id == 3:
                return True
            else:
                return False
        return False

class SoloLectura(BasePermission):
    def has_permission(self, request, view):
        if request.user:
            if request.method == 'GET':
                return True
            else:
                return False
        return False
