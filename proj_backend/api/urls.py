# api/urls.py
from django.urls import path
from .views import CustomLoginView, CreateUserView, UpdateUserView, ActiveVisitorListView, VisitorCreateView, VisitorListView
from .serializers import UserListView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('get-user/', UserListView.as_view(), name='get_user'),
    path('create-user/', CreateUserView.as_view(), name='create_user'),
    path('update-user/<int:pk>/', UpdateUserView.as_view(), name='update_user'),
    path('active-visitors/', ActiveVisitorListView.as_view(), name='active_visitors'),
    path('visitor/', VisitorCreateView.as_view(), name='visitor-create'),
    path('visitor-list/', VisitorListView.as_view(), name='visitor-list'),
]
