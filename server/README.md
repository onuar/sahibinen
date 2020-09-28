1- https://console.cloud.google.com/ yeni bir proje ekle

2- https://console.developers.google.com/ crendentials'tan "Service account" yarat ve "Create Key" deyip JSON olarak download et credential'i.

3- Drive içinde yaratılan spreadsheet dosyan için, credential dosyandaki email adresine yetki tanımla.

4- GCLOUD_PROJECT ve GOOGLE_APPLICATION_CREDENTIALS'ı persist et:
```
export GCLOUD_PROJECT={project ID of your google project}
export GOOGLE_APPLICATION_CREDENTIALS=./credential dosya directory'si.json
``` 

5- Kolonlar: Fiyat	Cephe	Kat/BinaKat	Oda	Net/Brüt	Bina yaş	Kimden	İlan	Tarih

6- Docker'da çalıştırmak için:

```docker build -t <your username>/sahibinen-server .```

```docker run -p 3012:3012 -d <your username>/sahibinen-server``` 