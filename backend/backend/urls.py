"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.conf import settings
from django.urls import path
from aktivana.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('company/add/', addCompany),
    path('company/get/all', getAllCompanys),
    path('company/update/', updateCompany),
    path('company/remove/', removeCompany),
    path('company/verify/', verifyCompanyCode),

    path('account/add/', addAcount),
    path('account/login/', login),
    path('account/getCodes/', acountGetCodes),
    path('account/useCode/', useCode),
    path('account/forgot/', forgotPassword),
    
    path('partner/add/', addPartner),
    path('partner/update/', updatePartner),
    path('partner/remove/', removePartner),
    path('partner/get/all', getAllPartners),
    
    path('code/get/',getCodes),
    path('code/del/', adminDeleteCode),
    path('code/add/', addCoupon),
    path('code/update/', updateCoupon),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
