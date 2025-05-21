#views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, VisitorSerializer
from .models import CustomUser, Visitor
from rest_framework.permissions import AllowAny, IsAuthenticated

class CreateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found'}, status=404)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class ActiveVisitorListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        active_visitors = CustomUser.objects.filter(role='visitor', is_active=True)
        serializer = UserSerializer(active_visitors, many=True)
        return Response(serializer.data)

class VisitorCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VisitorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VisitorListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        visitors = Visitor.objects.all().order_by('-created_at')
        serializer = VisitorSerializer(visitors, many=True)
        return Response(serializer.data)
