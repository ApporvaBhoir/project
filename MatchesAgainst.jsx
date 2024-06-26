//Import der gesamten Bibliothekimport React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MatchesAgainst.css'; 


//function 
//----------------------------------------------------------------
function MatchEachOther({ team1, team2 }) {
  //----------------------------------------------------------------
  //states

  const [matches, setMatches] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  //----------------------------------------------------------------
  //Hook:wird ausgeführt, wenn sich die Requisiten (Team1&Team2) ändern
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        //Datenbeeinflussung mit Axios        
        const response = await axios.get('/api/matches', {
          params: {
            home_team: team1,
            away_team: team2
          }
        });
        
        setMatches(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
//----------------------------------------------------------------
  //fetchMatches wird nach "loading..." aufgerufen.
      fetchMatches();
  }, [team1, team2]);

  if (loading) {
    return <div>Loading...</div>;
  }
//----------------------------------------------------------------
  return (
    <div className="match-info">
      <h1>Last Five Matches </h1>
      <table>
        <thead>
          <tr>
            <th>Date</th> 
            <th>Team1</th>
            <th>Team2</th>
          </tr>
        </thead>
        <tbody>
         {/* slice(-5):-gibt nur die letzten fünf Spiele/matches*/}
         {matches.slice(-5).map((match, index) => (
            <tr key={index}>

              <td>{match.date}</td>
              <td>{match.home_goals}</td>
              <td>{match.away_goals}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default MatchEachOther;
