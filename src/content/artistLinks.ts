export const artistLinks = {
    soundcloud:
      "https://soundcloud.com/vandort-sadkronik",
  
    instagram:
      "https://www.instagram.com/sadkronik/",
  
    youtube:
      "https://www.youtube.com/@VandortSadKronik",
  
    /**
     * Solo números:
     * código de país + lada + número.
     *
     * México:
     * https://wa.me/521XXXXXXXXXX
     */
    whatsapp:
      "https://wa.me/5219982463686",
  
    email:
      "booking@dj-vandort.com",
  
    riderPdf:
      "/media/docs/vandort-technical-rider.pdf",
  
    pressKitZip:
      "/media/documents/vandort-press-kit.zip",
  } as const;
  
  export const artistLabels = {
    soundcloud: "vandort-sadkronik",
    instagram: "@sadkronik",
    youtube: "@VandortSadKronik",
    whatsapp: "+52 9982463686",
    email: artistLinks.email,
  } as const;