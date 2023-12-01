import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: '#03045e',   // Warna primer
        secondary: '#0077b6', // Warna sekunder
        accent: '#90e0ef',    // Warna aksen
        neutral: '#caf0f8',   // Warna netral
        
      },
      boxShadow: {
        card: "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
      }
    },
    container: {
      screens: {
          sm: "470px",
          md: "598px",
          lg: "854px",
          xl: "1110px",
      },
      center: true,
    },
  }
}
