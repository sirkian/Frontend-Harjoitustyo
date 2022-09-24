import React from "react";

function Sidebar() {
  return (
    <div className="sidebarContainer">
      <p>
        Tarkoitus oli vain hahmoitella layouttia CSS-määrityksillä, mutta se
        tuppaa usein lähtemään hieman laukalle... <br />
        <br />
        Sentään en responsiivisuuteen panostanut, joten sivu näkyy oikein
        käytännössä vain koko näytön kokoisena <br /> <br />
        ps. Lomakekentällä lisääminen toimii, vaikka koodi kaipaakin jonkin
        verran optimointia. <br /> <br />
        pps. Lomakkeeseen tulee vielä lisäyksiä, ainakin mahdollisuus lisätä
        kuva ja tageja.
      </p>
    </div>
  );
}

export default Sidebar;
