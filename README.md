# Court-IQ Player Stats JSON to SQL Converter

## 📂 Project Overview

This repository contains a **Node.js-based transformation script** created during the early development of **Court-IQ**, a full-stack basketball analytics application. Before integrating live APIs, this script was essential for processing **historical NBA player data from 1947 to present**.

It transforms structured JSON data (converted from CSVs) into SQL `INSERT` statements that populate a PostgreSQL database. This data is now seeded in the [Court-IQ Backend](https://github.com/jorammercado/court-iq-server).

> 🔗 Although the historical data is seeded and deployed in the backend, it's not actively consumed by the frontend. Production use prioritizes real-time APIs like [API-NBA on RapidAPI](https://rapidapi.com/api-sports/api/api-nba). These APIs, however, lack deep historical records. This dataset may eventually enhance frontend features such as retro analytics or franchise history.

## 🔍 Data Source

Extracted from Kaggle:
**[NBA, ABA, BAA Stats — Kaggle](https://www.kaggle.com/datasets/sumitrodatta/nba-aba-baa-stats)**

Used CSVs:

* `Player Per Game.csv`
* `Team Summaries.csv`

These were converted to JSON format before processing.

## 🚀 Purpose

To seed the Court-IQ backend PostgreSQL database with rich, historical player-season data for:

* Development and prototyping
* Simulated analytics features
* Potential future integration with frontend UI

## ✨ Features

* **⌚ Decades of Coverage**: 29,000+ player-season records, 4,600+ unique players
* **✂ Data Cleaning**: Handles missing values, formatting quirks, and inconsistent types
* **⚖️ Relational Normalization**: Distinct `players` and `seasons` tables
* **📅 Season-aware**: Maintains link between player and corresponding season stats
* **♲ Output**: Two SQL files with bulk `INSERT` statements

## 💾 Output Files

* `OutputSQLPlayers.sql`:

  ```sql
  ('A.J. Green', 'NA', 24, 2024, 2, 'SG', 'MIL'),
  ```

* `OutputSQLSeasons.sql`:

  ```sql
  ('1', 2024, 'A.J. Green', 'SG', 24, 2, 'NBA', 'MIL', 36, 0, 9.3, ..., 4.3),
  ```

## 📊 Expected PostgreSQL Table Schema

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

## ⚙️ Usage Instructions

### 1. Install Node.js

Ensure Node.js is installed locally.

### 2. Clone the Repository

```bash
git clone https://github.com/jorammercado/court-iq-player-stats-json-to-sql.git
cd court-iq-player-stats-json-to-sql
```

### 3. Prepare Input Files

Convert these CSVs into JSON:

* `Player Per Game.csv` ➞ `playerpergame.json`
* `Team Summaries.csv` ➞ `teamsummaries.json`

You can use [CSVJSON](https://csvjson.com/csv2json) or a Node script.

### 4. Run the Script

```bash
node index.js
```

Generates:

* `OutputSQLPlayers.sql`
* `OutputSQLSeasons.sql`

You can now integrate them into a PostgreSQL seeding process.

## 📃 Glossary of Stats Fields

* `tm`: Team abbreviation (e.g. LAL = Lakers)
* `pos`: Position (e.g. SG = Shooting Guard)
* `lg`: League (NBA, ABA, etc.)
* `g`: Games played
* `gs`: Games started
* `mp_per_game`: Minutes per game
* `fg`, `fga`, `fg_percent`: Field goals + shooting %
* `x3p`, `x3pa`, `x3p_percent`: 3-point stats
* `x2p`, `x2pa`, `x2p_percent`: 2-point stats
* `e_fg_percent`: Effective FG%
* `ft`, `fta`, `ft_percent`: Free throw stats
* `orb`, `drb`, `trb`: Rebounds
* `ast`, `stl`, `blk`: Assists, steals, blocks
* `tov`: Turnovers
* `pf`: Personal fouls
* `pts`: Points per game

## 🔗 Related Repositories

* [Court-IQ Frontend](https://github.com/jorammercado/court-iq)
* [Court-IQ Backend](https://github.com/jorammercado/court-iq-server)

## 📄 License

Licensed under the [MIT License](https://opensource.org/license/mit).

## 📧 Contact

* Joram Mercado — [GitHub](https://github.com/jorammercado) | [LinkedIn](https://www.linkedin.com/in/jorammercado)
