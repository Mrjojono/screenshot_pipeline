function Addcards(data) {

    console.log("objet data a convertir",data)
    try {

        localStorage.setItem("user", JSON.stringify(data));
        return {"success": "insertion réussie"};
    } catch (e) {
        return {"error": "insertion a échoué: " + e.message};
    }
}

function Readcard() {

    try{
        const data = localStorage.getItem("user");
        return data ? JSON.parse(data):null;
    }catch (e) {
        console.log("error inconnu"+e);
        return {"error": e}
    }

}

async function GetMusique() {
    try {
      const response = await fetch("https://discoveryprovider.audius.co/v1/tracks/trending?app_name=EXAMPLE");
      const data = await response.json();
      return data.data;
    } catch (e) {
      console.error("Erreur dans GetMusique :", e);
      return [];
    }
  }


export default {Addcards,Readcard,GetMusique};