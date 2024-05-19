
from django.contrib import admin
from django.urls import path,include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from django.views.static import serve
from django.urls import re_path



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
    permission_classes=(AllowAny,),
       url='https://port-0-teamkerbelldjango-rm6l2llwbxs0ho.sel5.cloudtype.app/', # HTTPS URL을 여기에 지정

)


urlpatterns = [
    # swagger
    path('api/doc/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path("admin/", admin.site.urls),
    path('user/', include('user.urls')),
    path('comp/', include('comp.urls')),
    path('team/', include('team.urls')),
]
