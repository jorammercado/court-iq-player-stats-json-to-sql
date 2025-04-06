# Court-IQ Player Stats JSON to SQL Converter

## Project Overview

This repository contains a Node.js-based transformation script built during the early development of **Court-IQ**, a full-stack basketball analytics application. At the time, live APIs were not yet integrated, and this tool was used to process historical NBA player performance data from 1947 to the present.

The script converts structured JSON data derived from CSVs (originally sourced from Kaggle) into SQL `INSERT` statements for seeding a PostgreSQL database. This historical dataset was later integrated into the [Court-IQ Backend](https://github.com/jorammercado/court-iq-server).

> Although this data is currently seeded and deployed in the backend, it is not actively consumed by the Court-IQ frontend. Real-time APIs such as [API-NBA on RapidAPI](https://rapidapi.com/api-sports/api/api-nba) were prioritized for production due to their up-to-date nature. However, those APIs do not include comprehensive historical records like the ones in this dataset. In future development, this historical layer may be integrated into the frontend to enrich the basketball analytics and fan experience.

## Data Source

Data was extracted from the Kaggle dataset:
**[NBA, ABA, BAA Stats — Kaggle](https://www.kaggle.com/datasets/sumitrodatta/nba-aba-baa-stats)**

From the many CSV files available, this script specifically utilizes:
- `Player Per Game.csv`
- `Team Summaries.csv`

These were converted into JSON format before processing.

## Purpose

To seed the backend PostgreSQL database with historical player and season data, enabling a complete experience during the prototype phase of Court-IQ before transitioning to live data from sources such as [API-NBA on RapidAPI](https://rapidapi.com/api-sports/api/api-nba).

## Features

- **Historical Data Coverage**: Converts over 29,000 player-season records and 4,600+ individual players.
- **SQL Generation**: Creates bulk `INSERT` SQL statements for two tables: `players` and `seasons`.
- **Data Cleaning**: Handles inconsistent formatting, missing values, and type conversions.
- **Relational Structure**: Ensures normalized relationships between players and their multiple season stats.

## Output

- `OutputSQLPlayers.sql`: Contains records like:
  ```sql
  ('A.J. Green', 'NA', 24, 2024, 2, 'SG', 'MIL'),
  ```
- `OutputSQLSeasons.sql`: Contains detailed season statistics like:
  ```sql
  ('1', 2024, 'A.J. Green', 'SG', 24, 2, 'NBA', 'MIL', 36, 0, 9.3, ..., 4.3),
  ```

## Expected Table Structure

```sql
CREATE TABLE players (
  player_id SERIAL PRIMARY KEY,
  player TEXT NOT NULL,
  birth_year TEXT,
  age INT,
  season INT,
  experience INT,
  pos TEXT,
  tm TEXT
);

CREATE TABLE seasons (
  season_id SERIAL PRIMARY KEY,
  season INT NOT NULL,
  player TEXT NOT NULL,
  pos TEXT,
  age INT,
  experience INT,
  lg TEXT,
  tm TEXT,
  g INT,
  gs INT,
  mp_per_game INT,
  fg_per_game INT,
  fga_per_game INT,
  fg_percent INT,
  x3p_per_game INT,
  x3pa_per_game INT,
  x3p_percent INT,
  x2p_per_game INT,
  x2pa_per_game INT,
  x2p_percent INT,
  e_fg_percent INT,
  ft_per_game INT,
  fta_per_game INT,
  ft_percent INT,
  orb_per_game INT,
  drb_per_game INT,
  trb_per_game INT,
  ast_per_game INT,
  stl_per_game INT,
  blk_per_game INT,
  tov_per_game INT,
  pf_per_game INT,
  pts_per_game INT,
  player_id INTEGER REFERENCES players(player_id) ON DELETE CASCADE
);
```

## Usage Instructions

1. **Ensure Node.js is installed.**

2. **Clone the repository:**
```bash
git clone https://github.com/jorammercado/court-iq-player-stats-json-to-sql.git
cd court-iq-player-stats-json-to-sql
```

3. **Prepare your input JSON files:**
- `playerpergame.json` — Converted from `Player Per Game.csv`
- `teamsummaries.json` — Converted from `Team Summaries.csv`

You can convert CSVs to JSON using free online tools like [CSVJSON](https://csvjson.com/csv2json).

4. **Run the script:**
```bash
node index.js
```

This will generate:
- `OutputSQLPlayers.sql`
- `OutputSQLSeasons.sql`

These can then be integrated into your PostgreSQL seed process.

## Glossary of Acronyms & Fields

- `tm`: Team abbreviation (e.g., LAL for Los Angeles Lakers)
- `pos`: Player position (e.g., SG = Shooting Guard)
- `lg`: League (usually "NBA")
- `g`: Games played
- `gs`: Games started
- `mp_per_game`: Minutes played per game
- `fg`: Field goals
- `fga`: Field goals attempted
- `fg_percent`: Field goal percentage
- `x3p`: Three-point field goals
- `x3pa`: Three-point field goals attempted
- `x3p_percent`: Three-point field goal percentage
- `x2p`: Two-point field goals
- `e_fg_percent`: Effective field goal percentage
- `ft`: Free throws
- `fta`: Free throw attempts
- `ft_percent`: Free throw percentage
- `orb`, `drb`, `trb`: Offensive, Defensive, and Total Rebounds
- `ast`: Assists
- `stl`: Steals
- `blk`: Blocks
- `tov`: Turnovers
- `pf`: Personal fouls
- `pts`: Points per game

## Related Projects

- [Court-IQ Frontend](https://github.com/jorammercado/court-iq)
- [Court-IQ Backend](https://github.com/jorammercado/court-iq-server)

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).

## Contact

For questions or feedback:
- Joram Mercado — [GitHub](https://github.com/jorammercado) | [LinkedIn](https://www.linkedin.com/in/jorammercado)

