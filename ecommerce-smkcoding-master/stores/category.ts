import { defineStore } from "pinia";

export const categoryStore = defineStore("category", {
  state: () => ({
    category: {} as any,
    status: false,
    message: "",
  }),
  actions: {
    async getAllCategory(){
      try{
        const { baseUrl, apikey, secretKey } = useAppConfig();
        const {data, error} = await useFetch("/rest/v1/categories", {
          baseURL: baseUrl,
          method: "GET",
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${secretKey}`
          },
        })
        
        if(error.value){
          this.status = false;
          this.message = "Gagal Menambah Buku !!!";
        }else if(data){
          this.status = true;
          this.message = "Berhasil Menambah Buku !!!";
          this.category = data.value;
        }
      }catch(error){
        console.error(error);
      }
    },
    async createCategory(payload: any){
      try{
        const { baseUrl, apikey, secretKey } = useAppConfig();
        const {data, error} = await useFetch("/rest/v1/categories", {
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
          this.message = "Gagal Membuat Genre !!!";
        }else if(data){
          this.status = true;
          this.message = "Berhasil Menambah Genre !!!";
          this.category = data.value;
        }
      }catch(error){
        console.error(error);
      }
    },
  }
})