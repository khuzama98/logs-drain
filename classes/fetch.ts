export const baseUrl = "/";
// export const baseUrl = "http://localhost:3001";

export default class Services {
  static Get = async (route: string) => {
    try {
      const res = await fetch(`${baseUrl}${route}`);
      const response = await res.json();
      return response;
    } catch (e: any) {
      console.log(`Error in ${route} -->`, e);
      throw e.message;
    }
  };
  static Post = async (route: string, data: object) => {
    try {
      const res = await fetch(`${baseUrl}${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      return response;
    } catch (e:any) {
      console.log(`Error in ${route} -->`, e);
      throw e.message;
    }
  };
}
