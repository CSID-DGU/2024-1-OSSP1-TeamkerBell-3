import os
import django

# Django 환경 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'teamkerbell.settings')
django.setup()

# 이제 Django 환경이 설정되었으므로, 여기서 모델과 다른 패키지들을 import 할 수 있습니다.
import requests
from bs4 import BeautifulSoup
from comp.models import Comp

# 웹 페이지 주소 7126  37763~44888
#teamkerbell_backend/teamkerbell 에서  명령어 실행 python -c "from comp.tasks import crawl_website; crawl_website()"

def crawl_website():
    for i in range(0,2000):
        url = "https://thinkyou.co.kr/contest/"+str(i+42372)
        response = requests.get(url)
        if response.status_code == 200:
          soup = BeautifulSoup(response.text, "html.parser")
        title = soup.title.string

        if len(title) > 11:
            
            startDate=0
            endDate=0
            organization=0
            eligibillty=0
            applicationMethod=0
            context=0
            reward=0
            contact=0
            homepage=0
            img=0
            str1=0
            
            title=title.replace("공모전/대외활동 | ", "")
            
            detail = soup.find('div', class_='rightArea')
            th =detail.findAll('th')
            td =detail.findAll('td') 
            tag = soup.find('div', class_='contest_outline')
            dl_tags = tag.find_all('dl')

            img=soup.find('div', class_="thumb")
            img=img.find('img')
            img=img.get('data-srcs')
            img="https://thinkyou.co.kr"+str(img)

            for i, k in zip(th, td):
                if i.text=="홈페이지":
                    k=k.find('a')
                    k=k.get('href')
                    homepage=str(k)
                elif i.text=="접수기간":
                    timee=k.text.split(" ~ ")
                    startDate=timee[0]
                    endDate=timee[1]
                    endDate=str(endDate)
                elif i.text=="응모분야":
                    str1=str(k.text)
                elif i.text=="첨부파일":
                    pass
                elif i.text=="주최":
                    organization=k.text
                else:
                    pass
            for dl in dl_tags:
                dt_tag = dl.find('dt')
                dt_tag=dt_tag.text
                dd_tag = dl.find('dd')
                dd_tag= str(dd_tag).replace("<dd>", "")
                dd_tag= str(dd_tag).replace("</dd>", "")
                if (dt_tag=="지원자격") or (dt_tag=="응모자격") or (dt_tag=="참가대상"):
                    eligibillty=dd_tag
                elif (dt_tag=="지원방법") or (dt_tag=="접수방법"):
                    applicationMethod=dd_tag
                elif dt_tag=="응모주제":
                    context=dd_tag
                elif (dt_tag=="시상") or (dt_tag=="시상내역") or (dt_tag=="상금"):
                    reward=dd_tag
                elif (dt_tag=="문의처") or (dt_tag=="문의"):
                    contact=dd_tag
                #print(dd_tag)
            #if(title!=0) and (startDate!=0) and(endDate!=0)and(organization!=0)and(eligibillty!=0)and(applicationMethod!=0)and(context!=0)and(reward!=0)and(contact!=0)and(homepage!=0)and(img!=0)and(str1.find("과학/공학")!=-1):
            if str1.find("과학/공학") !=-1:
                Comp.objects.create(name=str(title), startDate=str(startDate),endDate=str(endDate), organization=str(organization), eligibillty=str(eligibillty), applicationMethod=str(applicationMethod), context=str(context), reward=str(reward), contact=str(contact), link=str(homepage), img=str(img))

if __name__ == '__main__':
    crawl_website()
