from django.contrib import admin
from django.urls import path,include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny

schema_view = get_schema_view(
    openapi.Info(
        title="TeamkerBell API",  # 타이틀
        default_version='ver 0.1',   # 버전
        description="팀커벨 API 모음",   # 설명
        terms_of_service="",
        contact=openapi.Contact(email="hkj020607@gmail.com")
),
    validators=['flex'],
    public=True,
    permission_classes=(AllowAny,)
)


urlpatterns = [
    # swagger
    path(r'swagger(?P<format>\.json|\.yaml)', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path(r'swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path(r'redoc', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc-v1'),
    path("admin/", admin.site.urls),
    path('user/', include('user.urls')),
]
