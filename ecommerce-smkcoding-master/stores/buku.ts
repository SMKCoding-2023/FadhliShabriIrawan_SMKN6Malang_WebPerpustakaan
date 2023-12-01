import { defineStore } from "pinia";

export const productsStore = defineStore("products", {
  state: () => ({
    products: {} as any,
    status: false,
    message: "",
    oneProduct: {} as any,
  }),
  actions: {
    async getAllProducts(){
      try{
        const { baseUrl, apikey, secretKey } = useAppConfig();
        const {data, error} = await useFetch("/rest/v1/buku", {
          baseURL: baseUrl,
          method: "GET",
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${secretKey}`
          },
        })
        
        if(error.value){
          this.status = false;
          this.message = "Get Products Failed !!!";
        }else if(data){
          this.status = true;
          this.message = "Get Products successfully";
          this.products = data.value;
        }
      }catch(error){
        console.error(error);
      }
    },
    async createProduct(payload: any){
      try{
        const { baseUrl, apikey, secretKey } = useAppConfig();
        const {data, error} = await useFetch("/rest/v1/buku", {
          baseURL: baseUrl,
          method: "POST",
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${secretKey}`
          },
          body: payload,
        })
        
        if(error.value){
          this.status = false;
          this.message = "Gagal Menambahkan Buku !!!";
        }else if(data){
          this.status = true;
          this.message = "Berhasil Menambahkan Buku";
          this.products = data.value;
        }
      }catch(error){
        console.error(error);
      }
    },
    async detailProduct(id: number){
      try{
        const { baseUrl, apikey, secretKey } = useAppConfig();
        const { data, error } = await useFetch(`rest/v1/buku?id=eq.${id}`, {
          baseURL: baseUrl,
          method: "GET",
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${secretKey}`
          },
        })

        if(error.value){
          this.status = false;
          this.message = "Gagal Menambahkan Buku !!!";
        }else if(data){
          this.status = true;
          this.message = "Berhasil Menambahkan Buku";
          this.oneProduct = data.value;
        }
      }catch(error){
        console.error(error);
      }
    },
    async updateProduct(payload: any, id: number){
      try{
        const { baseUrl, apikey, secretKey } = useAppConfig();
        const {data, error} = await useFetch(`rest/v1/buku?id=eq.${id}`, {
          baseURL: baseUrl,
          method: "PATCH",
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json"
          },
          body: payload,
        })
        if(error.value){
          this.status = false;
          this.message = "Gagal Update Buku !!!";
        }else if(data){
          this.status = true;
          this.message = "Berhasil Update Buku";
          this.oneProduct = data.value;
        }
      }catch(error){
        console.error(error);
      }
    },

          async deleteProduct(payload: any, id: number){
          try{
            const { baseUrl, apikey, secretKey } = useAppConfig();
            const {data, error} = await useFetch(`rest/v1/buku?id=eq.${id}`, {
              baseURL: baseUrl,
              method: "DELETE",
              headers: {
                apikey: apikey,
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json"
              },
              body: payload,
            })
            
            if(error.value){
              this.status = false;
              this.message = "Gagal Menghapus Buku !!!";
            }else if(data){
              this.status = true;
              this.message = "Berhasil Menghapus Buku";
              this.oneProduct = data.value;
            }
          }catch(error){
            console.error(error);
          }
        },

    async filterByIsCart(state: boolean){
      try{
        const { baseUrl, apikey, secretKey } = useAppConfig();
        const { data, error } = await useFetch(`rest/v1/buku?isCart=eq.${state}`, {
          baseURL: baseUrl,
          method: "GET",
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${secretKey}`
          },
        })

        if(error.value){
          this.status = false;
          this.message = "Gagal Menambahkan Buku !!!";
        }else if(data){
          this.status = true;
          this.message = "Berhasil Menambahkan Buku";
          this.products = data.value;
        }
      }catch(error){
        console.error(error);
      }
    },
    async filterByCategory(category: string){
      try{
        const { baseUrl, apikey, secretKey } = useAppConfig();
        const { data, error } = await useFetch(`rest/v1/buku?category=eq.${category}`, {
          baseURL: baseUrl,
          method: "GET",
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${secretKey}`
          },
        })

        if(error.value){
          this.status = false;
          this.message = "Gagal Menambahkan Buku dari Genre !!!";
        }else if(data){
          this.status = true;
          this.message = "Get Products By Category successfully";
          this.products = data.value;
        }
      }catch(error){
        console.error(error);
      }
    }
  }
})