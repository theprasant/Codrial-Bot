const paginate = async (msg, author, pages) => {
    await msg.react('⏮️').catch(()=>null)
    await msg.react('◀️').catch(()=>null).catch(()=>null)
    await msg.react('⏹️').catch(()=>null)
    await msg.react('▶️').catch((e)=>console.error(e))
    await msg.react('⏭️').catch(()=>null)
    await msg.react('🗑️').catch(()=>null)
    const filter = () => true;
    const collector = msg.createReactionCollector(filter, { idle: 180000, max: 999 })
    let i = 0;
    collector.on("collect", react => {
        if(!react.users.cache.map(u => u.id).includes(author.id)) return;
        switch (react.emoji.name) {
            case '⏮️':
                i = 0;
                break;
            case '◀️':
                i--;
                if(i < 0) i = pages.length - 1;
                break;
            case '⏹️':
                msg.channel.send('will add later xD')
                break;
            case '▶️':
                i++;
                if(i >= pages.length) i = 0;
                break;
            case '⏭️':
                i = pages.length - 1;
                break;
            case '🗑️':
                msg.delete().catch(()=>null);
                break;
        
            default:
                break;
        }
        
        if(react.emoji.name === '🗑️') return
        
            msg.edit(pages[i])
        if (i >= pages.length) i = 0;
        if (msg.member.hasPermission('MANAGE_MESSAGES')) {
            react.users.remove(author.id);
        }
        
    })
}

module.exports ={ paginate};




// const btnEvent = () => {
//     const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });

//     collector.on('collect', i => {
//         if (i.user.id === interaction.user.id) {
//             i.reply(`${i.user.id} clicked on the ${i.customId} button.`);
//         } else {
//             i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
//         }
//     });

//     collector.on('end', collected => {
//         console.log(`Collected ${collected.size} interactions.`);
//     });
// }

// module.exports = {btnEvent};