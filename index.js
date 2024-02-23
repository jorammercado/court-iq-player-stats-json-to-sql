const playerpergame = require("./playerpergame.json")//peryear
const teamsummaries = require("./teamsummaries.json")
const fs = require('fs')

const playerIndex = []
let indexPlayer = 0
const resultPlayers = []
const resultSeasons = []
let formatResultSQLSeasons = ""
let formatResultSQLPlayers = ""
count = 0

// player per game per year
for (let i = 0; i < playerpergame.length; i++) {

    if( playerpergame[i].lg!=="NBA" )
        continue

    let { season, player, birth_year, pos, age, experience, lg, tm, g, gs,
        mp_per_game, fg_per_game, fga_per_game, fg_percent, x3p_per_game,
        x3pa_per_game, x3p_percent, x2p_per_game, x2pa_per_game, x2p_percent,
        e_fg_percent, ft_per_game, fta_per_game, ft_percent, orb_per_game,
        drb_per_game, trb_per_game, ast_per_game, stl_per_game, blk_per_game,
        tov_per_game, pf_per_game, pts_per_game } = playerpergame[i]

    // format/fix values for proper sql handdling as defined in schema
    player = player.replace(/['`]/g, "''")
    if (typeof age === "string") age = -1
    if (typeof experience === "string") experience = -1
    if (typeof g === "string") g = -1
    if (typeof gs === "string") gs = -1
    if (typeof mp_per_game === "string") mp_per_game = -1
    if (typeof fg_per_game === "string") fg_per_game = -1
    if (typeof fga_per_game === "string") fga_per_game = -1
    if (typeof fg_percent === "string") fg_percent = -1
    if (typeof x3p_per_game === "string") x3p_per_game = -1
    if (typeof x3pa_per_game === "string") x3pa_per_game = -1
    if (typeof x3p_percent === "string") x3p_percent = -1
    if (typeof x2p_per_game === "string") x2p_per_game = -1
    if (typeof x2pa_per_game === "string") x2pa_per_game = -1
    if (typeof x2p_percent === "string") x2p_percent = -1
    if (typeof e_fg_percent === "string") e_fg_percent = -1
    if (typeof ft_per_game === "string") ft_per_game = -1
    if (typeof fta_per_game === "string") fta_per_game = -1
    if (typeof ft_percent === "string") ft_percent = -1
    if(typeof orb_per_game === "string") orb_per_game = -1
    if(typeof drb_per_game === "string") drb_per_game = -1
    if(typeof trb_per_game === "string") trb_per_game = -1
    if(typeof ast_per_game === "string") ast_per_game = -1
    if(typeof stl_per_game === "string") stl_per_game = -1
    if(typeof blk_per_game === "string") blk_per_game = -1
    if(typeof tov_per_game === "string") tov_per_game = -1
    if(typeof pf_per_game === "string") pf_per_game = -1
    if(typeof pts_per_game === "string") pts_per_game = -1


    if (playerIndex.indexOf(player) === -1) {
        playerIndex.push(player)
        resultPlayers.push({ player, birth_year, season, pos, age, experience, tm })
        formatResultSQLPlayers += `('${resultPlayers[indexPlayer].player}', '${resultPlayers[indexPlayer].birth_year}'`+
        `, ${resultPlayers[indexPlayer].age}, ${resultPlayers[indexPlayer].season}, ${resultPlayers[indexPlayer].experience}`+
        `, '${resultPlayers[indexPlayer].pos}', '${resultPlayers[indexPlayer].tm}'),\n`
        indexPlayer++
    }

    const player_index = playerIndex.indexOf(player) + 1
    resultSeasons.push({
        player_id: player_index,
        season, player, pos, age, experience, lg, tm, g, gs,
        mp_per_game, fg_per_game, fga_per_game, fg_percent, x3p_per_game,
        x3pa_per_game, x3p_percent, x2p_per_game, x2pa_per_game, x2p_percent,
        e_fg_percent, ft_per_game, fta_per_game, ft_percent, orb_per_game,
        drb_per_game, trb_per_game, ast_per_game, stl_per_game, blk_per_game,
        tov_per_game, pf_per_game, pts_per_game
    })

    formatResultSQLSeasons += `('${resultSeasons[count].player_id}', ` + `${resultSeasons[count].season},` +
        `'${resultSeasons[count].player}',` +
        ` '${resultSeasons[count].pos}', ${resultSeasons[count].age}, ${resultSeasons[count].experience},` +
        ` '${resultSeasons[count].lg}', '${resultSeasons[count].tm}', ${resultSeasons[count].g},` +
        ` ${resultSeasons[count].gs}, ${resultSeasons[count].mp_per_game}, ${resultSeasons[count].fg_per_game},` +
        ` ${resultSeasons[count].fga_per_game}, ${resultSeasons[count].fg_percent}, ${resultSeasons[count].x3p_per_game},` +
        ` ${resultSeasons[count].x3pa_per_game}, ${resultSeasons[count].x3p_percent}, ${resultSeasons[count].x2p_per_game},` +
        ` ${resultSeasons[count].x2pa_per_game}, ${resultSeasons[count].x2p_percent}, ${resultSeasons[count].e_fg_percent},` +
        ` ${resultSeasons[count].ft_per_game}, ${resultSeasons[count].fta_per_game}, ${resultSeasons[count].ft_percent},` +
        ` ${resultSeasons[count].orb_per_game}, ${resultSeasons[count].drb_per_game}, ${resultSeasons[count].trb_per_game},` +
        ` ${resultSeasons[count].ast_per_game}, ${resultSeasons[count].stl_per_game}, ${resultSeasons[count].blk_per_game},` +
        ` ${resultSeasons[count].tov_per_game}, ${resultSeasons[count].pf_per_game}, ${resultSeasons[count].pts_per_game} ),\n`

    count++
}


fs.writeFile('OutputSQLSeasons.sql', formatResultSQLSeasons, (err) => {
    if (err) throw err
})

fs.writeFile('OutputSQLPlayers.sql', formatResultSQLPlayers, (err) => {
    if (err) throw err
})



