import React from 'react';

function Datenschutz() {
  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <h1 className="fw-bold mb-4">Datenschutzerklärung</h1>

      <h2 className="h4 fw-bold mt-4 mb-2">1. Datenschutz auf einen Blick</h2>
      <p className="text-muted">
        Die Nutzung dieser Website ist in der Regel ohne Angabe personenbezogener Daten möglich.
        Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.
      </p>

      <h2 className="h4 fw-bold mt-4 mb-2">2. Allgemeine Hinweise und Pflichtinformationen</h2>
      <p className="text-muted">
        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist die im Impressum genannte Person.
        Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
        gespeicherten personenbezogenen Daten zu erhalten.
      </p>

      <h2 className="h4 fw-bold mt-4 mb-2">3. Datenerfassung über das Kontaktformular</h2>
      <p className="text-muted">
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
        Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
        der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
        wir nicht ohne Ihre Einwilligung weiter.
      </p>
      <p className="text-muted">
        Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
        sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
        vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
        auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen
        (Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h2 className="h4 fw-bold mt-4 mb-2">4. Hosting und Server-Log-Files</h2>
      <p className="text-muted">
        Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Files,
        die Ihr Browser automatisch an uns übermittelt (z.B. Browsertyp, IP-Adresse, Uhrzeit der Serveranfrage).
        Diese Daten sind nicht bestimmten Personen zuordenbar.
      </p>
    </div>
  );
}

export default Datenschutz;