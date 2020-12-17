<template>
    <div>
        <HelpTabs/>
        <div class="p-4">
            <!-- <h3>F.A.Q.</h3>
            <input class="input btn-large btn-block mb-4" placeholder="Search" v-model="q" />
            <div> -->
<h5>1. Introduction </h5>
<p>1.1 General info </p>
<p>1.2 Login and signup </p>
<p>1.3 User Settings </p>
<p>1.3.1 Settings </p>
<p>1.3.2 Referral </p>
<p>1.4. Steem account </p>
<p>1.4.1 Buying steem account </p>
<h5>2. DrugWars&nbsp;platform appearance </h5>
<p>2.1 Production Banner </p>
<p>2.2 Left menu </p>
<p>2.2.1 Overview </p>
<p>2.2.1.1 Overview </p>
<p>2.2.1.2 Tutorial </p>
<p>2.2.2 Buildings </p>
<p>2.2.2.1 Office </p>
<p>2.2.2.2 Drugs </p>
<p>2.2.2.3 Weapons </p>
<p>2.2.2.4 Alcohol </p>
<p>2.2.3 Bootcamp </p>
<p>2.2.3.1 Units </p>
<p>2.2.3.2 Training </p>
<p>2.2.4 Actions </p>
<p>2.2.4.1 Actions </p>
<p>2.2.4.1.1 ATTACK </p>
<p>2.2.4.1.2 TRANSPORT </p>
<p>2.2.4.1.3 OCCUPY </p>
<p>2.2.4.1.4 STATION </p>
<p>2.2.4.2 Out </p>
<p>2.2.4.3 In </p>
<p>2.2.4.5 Station </p>
<p>2.2.5 Map </p>
<p>2.2.6 Leaderboard </p>
<p>2.2.6.1 Hall of fame </p>
<p>2.2.6.2 Production </p>
<p>2.2.6.3 Heist </p>
<p>2.2.7 Gangs </p>
<p>2.2.7.1 Gangs </p>
<p>2.2.7.1.1 Joining a gang </p>
<p>2.2.7.2 Create Gang </p>
<p>2.2.7.3 Being a gang member </p>
<p>2.2.8 Jobs </p>
<p>2.2.9 Market </p>
<p>2.2.9.1 Shop </p>
<p>2.2.9.2 Exchange </p>
<p>2.2.10 Settings </p>
<p>2.2.11 Help </p>
<p>2.2.11.1 Help </p>
<p>2.2.11.2 Get started </p>
<p>2.2.11.3 Guides </p>
<p>2.2.12 Forum </p>
<p>2.2.13 Logout </p>
<p>2.2.12 Links area </p>
<p>2.2.12.1 Future Witness </p>
<p>2.2.12.2 Sound control </p>
<p>2.2.12.3 About </p>
<p>2.2.12.4 Discord link </p>
<p>2.2.12.5 Github link </p>
<p>2.3 Right menu </p>
<p>2.3.1 Daily prizes info </p>
<p>2.3.1.1 Daily prize </p>
<p>2.3.1.2 Battle prize </p>
<p>2.3.1.3 Heist prize </p>
<p>2.3.2 Heist </p>
<h5>3. Gameplay </h5>
<p>3.1 Production </p>
<p>3.1.1 Resources </p>
<p>3.1.1.1 Drugs </p>
<p>3.1.1.1.1 Crack house </p>
<p>3.1.1.1.2 Hydroponic Farm </p>
<p>3.1.1.1.3 Meth Lab </p>
<p>3.1.1.1.4 Cocina </p>
<p>3.1.1.1.5 Pharmaceutical Lab</p>
<p>3.1.1.1.6 Drug Storage</p>
<p>3.1.1.2 Weapons </p>
<p>3.1.1.2.1 Ammunition Factory </p>
<p>3.1.1.2.2 Weapon Factory </p>
<p>3.1.1.2.3 Smuggle </p>
<p>3.1.1.2.4 Black Market </p>
<p>3.1.1.2.5 3D Metal Printing </p>
<p>3.1.1.2.6 Weapon Storage </p>
<p>3.1.1.3 Alcohol </p>
<p>3.1.1.3.1 Traditional Distillery </p>
<p>3.1.1.3.2 Bar </p>
<p>3.1.1.3.3 Brewery </p>
<p>3.1.1.3.4 Castle </p>
<p>3.1.1.3.5 Industrial Distillery </p>
<p>3.1.1.3.6 Alcohol Silo </p>
<p>3.1.1.4 Office production </p>
<p>3.1.1.4.1 Headquarters </p>
<p>3.1.1.4.2 Training Facility </p>
<p>3.1.1.4.3 Operation Center </p>
<p>3.1.1.4.4 Pantheon </p>
<p>3.1.1.4.5 Research Center </p>
<p>3.1.2 Units </p>
<p>3.1.2.1 Recruiting units </p>
<p>3.1.2.1.1 HOBO </p>
<p>3.1.2.1.2 ROWDY </p>
<p>3.1.2.1.3 SUPER BOUNCER </p>
<p>3.1.2.1.4 BIG MAMA </p>
<p>3.1.2.1.5 KNIFER </p>
<p>3.1.2.1.6 GUNMAN </p>
<p>3.1.2.1.7 LAWYER </p>
<p>3.1.2.1.8 SPY </p>
<p>3.1.2.1.9 SNIPER </p>
<p>3.1.2.1.10 HITMAN </p>
<p>3.1.2.1.11 NINJA </p>
<p>3.1.2.1.12 BAZOOKA GUY </p>
<p>3.1.2.1.13 OCCUPATION TROOP </p>
<p>3.1.2.1.14 MERCENARY </p>
<p>3.1.2.1 Training units </p>
<p>3.1.2.1.1. Routing </p>
<p>3.1.2.1.2. Close Combat </p>
<p>3.1.2.1.3. Introduction to pistol, rifle, and shotgun </p>
<p>3.1.2.1.4. Information procurement </p>
<p>3.1.2.1.5. Sniper trains </p>
<p>3.1.2.1.6. Spirit wine </p>
<p>3.1.2.1.7. Coordination </p>
<p>3.1.2.1.8. Chemical training </p>
<p>3.1.2.1.9. Weapon master </p>
<p>3.1.2.1.10. Fire training </p>
<p>3.1.2.1.11. Protection </p>
<p>3.1.2.1.12. Bomb construction </p>
<p>3.1.2.1.13. Psychological training </p>
<p>3.2 Player location on the map </p>
<p>3.2.1 Choosing primary base location </p>
<p>3.2.2 Choosing secondary base locations </p>
<p>3.2.3 Production of buildings and units </p>
<p>3.3 Battles </p>
<p>3.3.1 Preparing for a battle </p>
<p>3.3.1.1 Unit production and training </p>
<p>3.3.1.2 Choosing targets </p>
<p>3.3.1.3 The fight simulator </p>
<p>3.3.1.4 Unit order and grouping </p>
<p>3.3.2 Battle process </p>
<p>3.3.3 Battle rewards </p>
<p>3.3.4 Sharing Battles </p>
<p>3.4 Heist </p>
<h5>4. Gangs </h5>
<p>4.1 Creating a gang </p>
<p>4.2 Joining a gang </p>
<p>4.2.1 Gang buildings </p>
<p>4.2.1.1 Gang headquarters </p>
<p>4.2.1.2 Embassy </p>
<p>4.2.1.3 Military Academy </p>
<p>4.2.1.4 Scientific Lab </p>
<p>4.2.1.5 Weapon Development Center </p>
<p>4.2.1.6 Distillery School </p>
<p>4.2.2 Deposit </p>
<p>4.3 Affiliations </p>
<p>4.3.1 Wars </p>
<p>4.3.2 Alliances </p>
<p>4.4 Jobs </p>
<p>4.5. Leaving a gang </p>
<h5>5. Sharing resources with other players </h5>
<h5>6. Card collecting </h5>
<h5>7. F.A.Q. </h5>
<p>7.1 Are bots allowed in the game? </p>
<p>7.2 Why is my shared battle not upvoted? </p>
<p>7.3 Is being in the gang better than playing solo? </p>
<p>7.4 Can I have more than one DrugWars&nbsp;account? </p>
<p>7.5 Why are daily rewards going up and down? </p>
<p>7.6 My daily rewards are dependent&nbsp;on which base? </p>
<p>7.7 How do I know which base I am currently on? </p>
<p>7.8 Why are my resources in red and will not go higher than a certain amount? </p>
<p>7.9 Can someone steal my base? </p>
<p>7.10 Can I share my resources with other players? </p>
<p>7.11 Why didn't I get any resources after winning a battle? </p>
<p>7.12 Do I have to battle other players? </p>
<p>7.13 What is Steem Engine? </p>
<p>7.14 How can I buy DWD tokens on Steem Engine and transfer them to DrugWars? </p>
<p>7.15 How can I withdraw my DWD tokens from the game to Steem Engine? </p>
<p>7.16. Why does the price of DWD tokens keep changing? </p>
<hr/>
<h1>1. Introduction</h1>
<p>DrugWars is an online game built on blockchain technology that combines MMORPG and MMORTS into one PvP gaming experience that provides monetized prizes that are awarded daily. Players receive cryptocurrency for their achievements in the game every 24 hours. Playing the game is currently completely free of charge although there are options of payment to speed up various game components and increase the chances of receiving a bigger payout at the end of the day. The player can choose in which cryptocurrency he or she will receive the prize while the default currency is set on that one of the DrugWars game.</p>
<p>DrugWars game has been brought to you by Futureshock which already has successful projects in their history such as Fundition, a first blockchain based crowdfunding platform that you can visit here: https://fundition.io.</p>
<h2><br/>1.1 General info</h2>
<p>The game is available at https://drugwars.io/&nbsp;while there is also a discord channel https://discord.gg/vwzAdva&nbsp;on which players can get additional information and updates as well as steemit page https://steemit.com/@drugwars&nbsp;where regular news with updates are published. The basic gameplay consists of building an empire through upgrades of numerous buildings, collecting exclusive cards, and battling against other players.</p>
<h2>1.2 Login and signup<img src="/img/help/image47.jpg"/></h2>
<p>To be able to play the game, a person needs to log in or sign up. This is possible by connecting the DrugWars account with those on Facebook, Google, Vkontakte, or Steemit through the services of Steem Connect. Logging in to the game is completely free of charge. To log in, visit https://drugwars.io/&nbsp;and click on Login, when the screen with different login options appears, click on the one you prefer and follow the logical instructions.</p>
<p>Once a player is logged in, he or she can continue to personalize his account and settings by choosing a nickname, profile picture, and alert options. There is also a referral link available which can be sent to people so the player receives an additional bonus.</p>
<hr/>
<h2>1.3 User Settings</h2>
<p>Settings are located in the bottom left menu on the DrugWars platform.</p>
<h3>1.3.1 Settings</h3>
<p>Once a player clicks on the Settings, the following screen will appear in the main frame:</p>
<p><img src="/img/help/image101.jpg"/></p>
<p>Players can change their nicknames no more than once a month and they can not do it for two days after their last started battle with other players. The profile picture is added by pasting down the image location a.k.a. image address. You can do this by the right click of your mouse on the image you want and choosing &ldquo;copy image address&rdquo;. Make sure that you use the image that is not protected by any copyright laws. DrugWars will not be responsible for any violations of copyrights done by its players.</p>
<p><img src="/img/help/image2.jpg"/></p>
<p>When you enter your nickname and profile image, click on EDIT. Your settings will be saved and visible in the upper right corner, above the left menu. They are in a yellow circle with your rank and level number over them. For the purposes of this guide, we have created the user &ldquo;Guide&rdquo; which will be used for creating needed screenshots.</p>
<hr/>
<h3>1.3.2 Referral</h3>
<p>Next to Settings in the main Settings frame, there is a Referral button. When you click on it, the next screen will appear in the frame:</p>
<p><img src="/img/help/image113.jpg"/></p>
<p>Share your referral link with your friends and receive the bonus, all you need to do is copy it and send it. When your friend clicks on that referral link, they will go through the registration process. Once they finish it, you will see their info under &ldquo;YOUR REFERRALS&rdquo;. There is no limit to how many players you can refer to the game.</p>
<h2>1.4. Steem account</h2>
<p>DrugWars game is built on steem blockchain and is considered to be a DApp. Steem blockchain was created on March 24, 2016 and it is the first social blockchain with revenue streams that rewards users for sharing content. It powers real applications through social apps such as steemit (main platform of steem). For more information about steem, visit https://steem.com/&nbsp;and https://steemit.com. In short, steemit is a crypto social media platform that awards its users with cryptocurrency by combining social media and creating content with curation and contributions to the network that are in turn, awarded with three digital tokens of the Steemit ecosystem: STEEM, Steem Power (SP) and Steem Dollars.</p>
<h3>1.4.1 Buying steem account</h3>
<p>You can log in to DrugWars by using your steem account as explained in Login and setup. If you do not have one yet, it can be easily bought on DrugWars platform. When you first visit DrugWars, there is a link underneath the login which you can use:</p>
<p><img src="/img/help/image94.jpg"/></p>
<p>The link will take you to steem.ninja&nbsp;page where you can easily purchase your Steem account.</p>
<hr/>
<h1>2. DrugWars platform appearance</h1>
<p>DrugWars platform is available at https://drugwars.io/&nbsp;and once you are logged in, the following screen will appear:</p>
<p><img src="/img/help/image5.jpg"/></p>
<p>On the platform, you will see the following elements: functional banner with your production info at the top, your icon with rank and level on the left with two menus underneath it, links area under menus, the main frame in the middle and the right banner that is split in two with prizes and heist info. There is also a collapsed window of DrugWars live chat in the bottom right corner. Whatever you do on the platform, only the main frame will change its appearance, all the menus and banners will remain in their places while your interactions will result in showing you different content in the frame.</p>
<h2>2.1 Production Banner</h2>
<p>At the very top of the DrugWars platform, there is a production banner that has information about your current production of resources. You can see how many drugs/weapons/alcohol you have with information about how much you produce daily and how much is in your safe. Your daily bonus production is displayed after your production number as &ldquo;+xxx K/DAY&rdquo;. The three xxx representing the bonus amount. You are also informed about your daily production of drugs in the line beneath your production info. Your prize is calculated based on the overall drug production in the game which is also presented in that text line. You can see how much you will get for your prize and if you have a Steem account, the amount in your Steem wallet will be on the right.</p>
<p><img src="/img/help/image80.jpg"/></p>
<hr/>
<h2>2.2 Left Menu<img src="/img/help/image131.jpg"/></h2>
<p>For easy navigation, you will always see what page you are own because it will be highlighted yellow in the left menu. That menu is broken down in two parts; the upper menu has everything related to gameplay overview, buildings, bootcamp, missions, map, leaderboards, gangs, jobs, and market. The second part of the menu has settings, help, and forum.</p>
<p>When you click on any part of the menu, the content will appear in the frame. Some content will have multiple parts that you can navigate through by using additional smaller menus that will appear at the top of the main page. As with the right menu, your location in additional parts of the game will also be highlighted yellow in the smaller menu.</p>
<p><img src="/img/help/image57.jpg"/></p>
<h3>2.2.1 Overview</h3>
<p>The Overview is the landing page that you will see when you log in to the game. It consists of two parts; the Overview and Tutorial. It is located at the first place of the left menu.</p>
<p><img src="/img/help/image10.jpg"/></p>
<h4>2.2.1.1 Overview</h4>
<p>The overview will show you your production of resources in 3 categories: Drugs, Weapons, and Alcohol production. Each resource has 5 buildings that contribute to how much each resource generates per day and per hour. Under sections is the information about total resources that you produce per day and per hour and the time remaining to have full capacity of resources based on your production. You will also see your total capacity and how much of that is safe which is controlled by Drug Storage, Weapon Storage, and Alcohol Silo.</p>
<h4>2.2.1.2 Tutorial</h4>
<p>For new players, the tutorial is the best place to start and get familiar with the game. You will see a welcome message from our developer and CEO. We have prepared several simple tasks you will need to complete. They are specifically designed so you get accustomed to where things are and how to play. When you click on each task, it will guide you in how to complete it.</p>
<p><img src="/img/help/image93.jpg"/></p>
<h3>2.2.2 Buildings</h3>
<p>Everything in DrugWars is in some way connected to buildings. A player produces resources with them, they allow the purchase and training of battle units, keep your resources safe, etc. There are five types of buildings, Office, Drugs, Weapons, and Alcohol buildings can be reached in the left menu by clicking on Buildings, while Gang Buildings are available through the Gang tab in the left menu. To learn about what each individual building produces and how it functions read Production.</p>
<p><img src="/img/help/image117.jpg"/></p>
<p>Each building has information about the required resources for its upgrade just below its title, description, current production and the production that will happen with the next upgrade, the time required for upgrade, and two upgrade links: normal (top one in green color) and instant one bottom one in yellow color).</p>
<p>If you have all the resources necessary, they will be in white color while the UPGRADE button will be green. If you are missing resources, they will be in red color while the UPGRADE button will say &ldquo;MISS RESOURCES&rdquo; and be black.</p>
<p>Every upgrade requires a certain amount of time to be completed which is different for each building. Once you click on the UPGRADE button, your resources will be lowered by the amount needed for the upgrade (spent), the upgrade will start and your building will rise in its level, by one, when the set time has passed. If you want an instant upgrade, click on the yellow button that says how much crypto you will spend on it. The instant upgrade will raise your building level immediately and instead of spending your resources, you will pay for it with crypto. If you do not have enough crypto for the upgrade, this option will not be available and the button will be black instead of yellow.</p>
<h4>2.2.2.1 Office</h4>
<p><img src="/img/help/image91.jpg"/></p>
<p>Office buildings do not create resources but they are the ones that make it possible for other buildings to create them. In that way, they are the most important ones because they impact other buildings and condition if you can upgrade them or not. To learn about each office building and how it functions, read about it in Office Production.</p>
<h4>2.2.2.2 Drugs</h4>
<p><img src="/img/help/image50.jpg"/></p>
<p>Drug buildings produce the drug resource, there are five of them and if you want to learn about each drug building, read about it in Drugs.</p>
<h4>2.2.2.3 Weapons</h4>
<p><img src="/img/help/image123.jpg"/></p>
<p>Weapon buildings produce the weapon resource, there are five of them and if you want to learn about each weapon building, read about it in Weapons.</p>
<h4>2.2.2.4 Alcohol</h4>
<p><img src="/img/help/image74.jpg"/></p>
<p>Alcohol buildings produce the alcohol resource, there are five of them and if you want to learn about each alcohol building, read about it in Alcohol.</p>
<h4>2.2.2.5 Defense</h4>
<p>There are six defensive buildings providing different aspects of defense around your base. If you want to learn about each alcohol building, read about it in Defense.</p>
<h3>2.2.3 Bootcamp</h3>
<p>Bootcamp is the place where you will produce and train your units. In order to be able to produce units, you will firstly need to build a Training Facility building that is located in Buildings -&gt; Office. If you want to train your units then you firstly need to build the Research Center building that is located in the Office Buildings.</p>
<h3>2.2.3.1 Units</h3>
<p><img src="/img/help/image81.jpg"/></p>
<p>Once you have the Training Facility building, you will see all the units when you click on Bootcamp in the left menu. Each Unit has the following info: name, type, cost, supply, description, offensive and resistance characteristics, time needed for recruitment and the cost for instant recruit. Instant recruit is paid with crypto and does not remove your resources. Upgrading your Training Facility buildings lets you have shorter time for upgrades. In order to recruit any unit, simply put the number of wanted units in the white space and either click on the green button to pay for them with resources or click on the crypto button to pay for them with crypto. To get specific info on how to produce units click here: Producing Units, and to get the info about units that will come in handy for battles, click here: Unit production.</p>
<h4>2.2.3.2 Training</h4>
<p><img src="/img/help/image48.jpg"/></p>
<p>To be able to see the training a player first needs to have the Research Center built from the Office buildings. Once the Research Center is built, 13 training options will be available. Each training has levels for upgrading and is helping players units to be better in battles by increasing their various skills. Every training option has the following info: name, type, cost, description, time needed for recruitment and the cost for instant recruit. Instant recruit is paid with crypto and does not remove your resources. Upgrading your Research Center building lets you have more levels for upgrades of trainings. Training levels can not be higher than the Research Center so if you, for example, have a Research Center at level 4, all your trainings can go up to level 4. To get specific info on how to train your units click here: Training Units.</p>
<p>There are 13 different training areas:</p>
<table>
<tbody>
<tr>
<td>
<p>1</p>
</td>
<td>
<p>Routing</p>
</td>
<td>
<p>8</p>
</td>
<td>
<p>Chemical Training</p>
</td>
</tr>
<tr>
<td>
<p>2</p>
</td>
<td>
<p>Close Combat</p>
</td>
<td>
<p>9</p>
</td>
<td>
<p>Weapon Master</p>
</td>
</tr>
<tr>
<td>
<p>3</p>
</td>
<td>
<p>Pistol, Rifle and Shotgun</p>
</td>
<td>
<p>10</p>
</td>
<td>
<p>Fire Training</p>
</td>
</tr>
<tr>
<td>
<p>4</p>
</td>
<td>
<p>Information Procurement</p>
</td>
<td>
<p>11</p>
</td>
<td>
<p>Protection</p>
</td>
</tr>
<tr>
<td>
<p>5</p>
</td>
<td>
<p>Sniper Training</p>
</td>
<td>
<p>12</p>
</td>
<td>
<p>Bomb Construction</p>
</td>
</tr>
<tr>
<td>
<p>6</p>
</td>
<td>
<p>Spirit Wine</p>
</td>
<td>
<p>13</p>
</td>
<td>
<p>Psychological Training</p>
</td>
</tr>
<tr>
<td>
<p>7</p>
</td>
<td>
<p>Coordination</p>
</td>
</tr>
</tbody>
</table>
<h3>2.2.3.3 Priority of Units</h3>
<p>When in an attack, units will be hit in the following order.</p>
<table>
<tbody>
<tr>
<td>
<p>1</p>
</td>
<td>
<p>Spy</p>
</td>
<td>
<p>9</p>
</td>
<td>
<p>Lawyer</p>
</td>
</tr>
<tr>
<td>
<p>2</p>
</td>
<td>
<p>Hobo</p>
</td>
<td>
<p>10</p>
</td>
<td>
<p>Hitman</p>
</td>
</tr>
<tr>
<td>
<p>3</p>
</td>
<td>
<p>Roudy</p>
</td>
<td>
<p>11</p>
</td>
<td>
<p>Biker</p>
</td>
</tr>
<tr>
<td>
<p>4</p>
</td>
<td>
<p>Super Bouncer</p>
</td>
<td>
<p>12</p>
</td>
<td>
<p>Sniper</p>
</td>
</tr>
<tr>
<td>
<p>5</p>
</td>
<td>
<p>Big Mama</p>
</td>
<td>
<p>13</p>
</td>
<td>
<p>Bazooka Man</p>
</td>
</tr>
<tr>
<td>
<p>6</p>
</td>
<td>
<p>Knifer</p>
</td>
<td>
<p>14</p>
</td>
<td>
<p>Mercenary</p>
</td>
</tr>
<tr>
<td>
<p>7</p>
</td>
<td>
<p>Ninja</p>
</td>
<td>
<p>15</p>
</td>
<td>
<p>AH-64 Apache</p>
</td>
</tr>
<tr>
<td>
<p>8</p>
</td>
<td>
<p>Gunman</p>
</td>
<td>
<p>16</p>
</td>
<td>
<p>Occupation Troop</p>
</td>
</tr>
</tbody>
</table>
<h3>2.2.3.4 Unit Attributes</h3>
<p>Units have the following attributes:</p>
<ol>
<li>Cost: this is the cost of drugs, weapons and alcohol to produce the number of units in the box.</li>
<li>Supply: this is a power multiplier and maintenance requirement. The larger the number, the more power the unit brings to attacks. This value is also used in the Bunker, each unit requires the specified number of storage spaces. Example, if your Bunker has a capacity of 1000, one AH-64 Apache will require 10 of that 1000 to protect.</li>
<li>Cluster: this is how many of the unit will attack per iteration. If there is a cluster of 100 and you have 200 units, they will attack in 2 groups of 100.</li>
<li>Offensive -&gt; Attack: The strength of attack.</li>
<li>Offensive -&gt; Carry: The amount of combined resources the unit can carry.</li>
<li>Defensive -&gt; Health: The hit points a unit can take before being killed.</li>
<li>Defensive -&gt; Resistance: This is the &ldquo;shielding&rdquo; value for the unit.</li>
<li>Extra -&gt; Speed: The amount of time it takes to transport the unit. Transporting 1 unit takes this amount of time and transporting 100 of the same unit also takes this amount of time. Increasing or decreasing the number of the unit does not change the time requirement.</li>
<li>Extra -&gt; Move Cost: This is the cost, in Drugs, to move each unit. Moving one unit will cost the stated value. Moving 100 unites will cost the value * 100.</li>
</ol>
<p>The name of each unit is followed by a category, either Melee or Range. Malee units are more the hand-to-hand combat units while the Range units attack from a distance.</p>
<h3>2.2.4 Actions</h3>
<p><img src="/img/help/image72.jpg"/></p>
<p>Actions is the place a player needs to go if he wants to attack other players, occupy a new base or transport resources and units to his bases. There are 4 additional tabs within actions,&nbsp;the first, attack, is automatically opened. That one is the only responsive one that allows players different actions while tabs out, in,&nbsp;and station&nbsp;are informative. They provide information about what is going on.</p>
<h4>2.2.4.1 Actions</h4>
<p>There are 4 actions a player can take. He can ATTACK one of his opponents, TRANSPORT resources to another base, OCCUPY a new base or STATION units to another base.</p>
<h5>2.2.4.1.1 Attack</h5>
<p><img src="/img/help/image18.jpg"/></p>
<p>To attack someone, first select your army. It is done by typing in the number in the blank space below the image, then clicking on the image to add. To start a fight, target coordinates must be entered. A fight message is optional and should not be insulting or discriminating regarding gender, sexual and religious preferences, nationality, skin color, health etc. or it will be sanctioned by the developers and punished accordingly.</p>
<h5>2.2.4.1.2 Transport</h5>
<p><img src="/img/help/image89.jpg"/></p>
<p>A player can both transport resources to one of his own bases or to another player. To be able to transport resources, there must be units selected who will carry those resources. After selecting units and resources, a player must enter the coordinates of the base where those resources must go and click on TRANSPORT. To learn more about sharing resources with other players, read Sharing resources with other players.</p>
<h5>2.2.4.1.3 Occupy</h5>
<p><img src="/img/help/image59.jpg"/></p>
<p>To occupy a new base, a player must first have 1 occupation troop. It is not possible to occupy a new territory without this unit because the unit itself transforms into the base. Once the unit is selected, a player needs to enter the coordinates of the territory and choose a name for the new base. After the button OCCUPY is clicked on, new base will be created instantly. To learn more about occupying new bases, read Choosing secondary base locations.</p>
<h5>2.2.4.1.4 Station</h5>
<p>To station units at another base, follow the same procedure as for the transport of resources. The only difference here is that you wont need to select resources, you will only need to select the units you wish to station at another base.</p>
<h4>2.2.4.2 Out</h4>
<p>The out tab will show you information about outgoing actions, those that a player has started himself. Those actions will be listed with general information who won and lost but you can get more information if you simply click on the SHOW DETAILS. Since outgoing actions (just like incoming) have a time delay, there will be a number in the brackets that will indicate how many battles will happen. When a player clicks on OUT that has a number in the brackets, battles that will happen will be listed before those that already did with the exact time when the fight will happen.</p>
<h4>2.2.4.3 In</h4>
<p>The in tab will show you information about incoming actions, those that a player did not start but were the actions invoked on him by other players. Those battles will be listed with general information who won and lost but you can get more information if you simply click on the SHOW DETAILS. Since incoming actions (just like outgoing) have a time delay, there will be a number in the brackets that will indicate how many battles will happen. When a player clicks on IN that has a number in the brackets, actions that will happen will be listed before those that already did with the exact time when the fight will happen.</p>
<h4>2.2.4.5 Station</h4>
<p>Station tab is informative just like Out and In tabs. This one will provide information about units that are being stationed at a certain base. Station is a time delayed action and there will be a number in the brackets indicating how a stationing will happen. Station activities can be seen in Actions -&gt; Station, there will be information on units and the time when they will arrive at the base. In the example below, there are no ingoing or outgoing actions but there is one station action that will happen which is indicated by the numbers in the brackets.</p>
<p><img src="/img/help/image100.jpg"/></p>
<h3>2.2.5 Map</h3>
<p><img src="/img/help/image110.jpg"/></p>
<p>Map is the place where a player chooses his main location and several additional ones. It is also the place where he can choose which location to attack and start a battle with a player that is on it. To choose any location either for his base or for attack, a simple click on the hexagon is needed. The Earth is interactive and is slowly spinning around its axis but a player can turn it around manually by clicking and moving his mouse. To learn about how you can choose your bases, read Player location on the map.</p>
<h3>2.2.6 Leaderboards</h3>
<p>Leaderboards is where you can see the list of top players in 6 categories of game play, Production, Prestige, Heist, Fight, Job and Lottery. Each list is generated based on the results of every player in the game. Hall of fame lists the top users in battles, Production lists the top players in production of the drug resource, and the Heist lists those who have won the most in the daily heist. There are bonus awards in crypto for players who are on the lists that can be seen next to the names of players.</p>
<h4>2.2.6.1 Production (PROD)<sup>[a]</sup></h4>
<p><img src="/img/help/image133.jpg"/></p>
<p>Production list has the names of the best players based on their Drug production. Production of weapons and alcohol are listed too but the list is generated solely on how much drugs a player produces. As long as a player is on the list, he or she will receive an additional prize in crypto that is listed right from the production info of each player. This reward is not the same as the daily reward for production, to read about the daily production reward, click here: Daily prize.</p>
<h4>2.2.6.2 Cruelty</h4>
<h4>2.2.6.3 Heist</h4>
<p><img src="/img/help/image129.jpg"/></p>
<p>Heist list has the names of players who have deposited the biggest drug amounts into heist. As long as the player is on the list, he or she will receive additional reward in crypto that is listed right from the amount of drugs deposited. This reward is not the same as the daily heist reward, to read about a daily heist reward, click here: Heist prize. To learn how you can invest your drugs into heists, click here: Heist.</p>
<h4>2.2.6.4 Fight</h4>
<h4>2.2.6.5 Job</h4>
<h4>2.2.6.6 Lottery</h4>
<h3>2.2.7 Gangs</h3>
<p>When you are in the Gang tab, all the gangs are listed in the main frame so you can scroll through them and read their descriptions. If a player chooses, he can create or join an existing gang. To learn all about gangs, read about it here: GANGS. When you click on Gangs in the left menu, there are two possible main frames that may appear. If you are not yet a part of any gang, you will see the following upper menu above the main frame:</p>
<p><img src="/img/help/image60.jpg"/></p>
<h4>2.2.7.1 Joining a Gang</h4>
<p>You can apply to join a gang by simply clicking on their name in the gang list. Once done, the application page of that gang with their info and the input space for you to write a message to them. That writing is optional but highly recommended. When you are done, click on the apply button.</p>
<p><img src="/img/help/image130.jpg"/></p>
<h4>2.2.7.2 Create a Gang</h4>
<p>If you want to create your own gang, click on the Create Gang tab. It will open the following in the main screen if you do not have enough resources:</p>
<p>If you do have the necessary resources, all you need to do is add a name and description before you click on CREATE and your new gang will be ready.</p>
<h4>2.2.7.3 Being a Gang Member</h4>
<p>Once you become a gang member, every time you click on Gangs in the left menu, the main frame will have the following upper menu:</p>
<p><img src="/img/help/image75.png"/></p>
<p>By clicking on various parts in that menu, you will be diverted to different gang related material. Only the Gangs page will look the same as it would if you were not in the gang. My gang will list you all the gang members, Buildings will show you gang buildings and options to donate your resources to them, Diplomacy will get you options to declare wars or alliances and in Deposit, you can see which gang member has donated how much to each gang building. To get information about how gang buildings function and what are their benefits, click here: Gang buildings</p>
<h4>2.2.7.4 Gang Roles</h4>
<p>Within a Gang, there are roles of which you are assigned. The lead is the Boss. After the Boss, there is Capo. A Capo is assigned by the Boss. Capo has a none-to-many relationship to the Gang, meaning there can be no Capo, or many Capo, at the discretion of the Boss.</p>
<h3>2.2.8 Jobs</h3>
<p>There are two types of jobs, &ldquo;JOBS&rdquo; and &ldquo;GANG JOBS&rdquo;. Both Jobs and Gang Jobs are started by clicking the START JOB button.</p>
<p><img src="/img/help/image82.png"/>&nbsp;<img src="/img/help/image115.png"/></p>
<h4>2.2.8.1 (Solo) Jobs<img src="/img/help/image15.png"/><img src="/img/help/image112.png"/></h4>
<p>Jobs are solo jobs that are done by the individual player alone. Once the job is started, you have until the timer completes to finish the job. Finishing the job simply means that all the DRUGWARS NPC units need to be killed. Once complete, you receive the job rewards as stated.</p>
<h4>2.2.8.2 Gang Jobs</h4>
<p>Gang Jobs are similar to regular Jobs, except they apply to the whole gang. One to many gang members may participate in a gang job and the rewards are shared amongst the active players for that day, plus an additional Gang Bonus.</p>
<h3>2.2.9 Market</h3>
<p>Market is the place where you can safely purchase or withdraw your DWD tokens. For purchasing, please consider that we always recommend you to use SteemEngine&nbsp;to get DWD tokens at a fair price decided by players.</p>
<h4>2.2.9.1 Market</h4>
<h4>2.2.9.2 Withdraw</h4>
<h3>2.2.10 Settings</h3>
<p>Settings are explained in the introduction part of this document. See User Settings.</p>
<h3>2.2.11 Help</h3>
<p>The basic information you need to know about the game is located in the bottom left menu behind the button Help. It has 3 parts, Help (FAQ), Get Started, and Guides. We suggest to all of our players to read this part once they start playing the game.</p>
<h4>2.2.11.1 Help<img src="/img/help/image23.jpg"/></h4>
<p>The help part Frequently Asked Questions has appropriate answers below each question. You can read about gameplay, errors you may receive if you do not have enough resources for upgrades, awards, battles, player info etc. The extended FAQ is available at the end of this document, to skip to it, click here: F.A.Q.</p>
<h4>2.2.11.2 Get started</h4>
<p><img src="/img/help/image63.jpg"/></p>
<p>The Get started has basic and general advice about what you should do once you start playing the game. It will tell you to produce resources, build units, and attack other players. It will also wish you luck and remind you that this is a game and all is fair. DrugWars is not responsible for any psychological problems or addictions. If you notice that playing the game is keeping you from your normal life and activities, please seek professional help.</p>
<h4>2.2.11.3 Guides</h4>
<p><img src="/img/help/image27.jpg"/></p>
<p>Guides will regularly be updated with links to guides which were created by the community of DrugWars for the community of DrugWars. If you have built a guide that you think can help other players, feel free to contact us and send us the link. We will see if your work is of quality and beneficial to other players.</p>
<h3>2.2.12 Forum</h3>
<p>DrugWars has its official forum that can be reached either by clicking on the Forum in the bottom left menu or by visiting the link: https://drugwars.tokenbb.io/&nbsp;(the page that the button in the menu will open in a new tab once you click on it). The forum needs your login that can be done by your Steem account credentials, SteemConnect, Google or Facebook account or with your e-mail.</p>
<p><img src="/img/help/image119.jpg"/></p>
<p>Forum is a place where you can read all about what is new with the game&nbsp;and share your experience with other players. It is also the place where you can share your battles. To learn more about sharing battles on Forum, click here: Sharing Battles.</p>
<h3>2.2.13 Logout</h3>
<p>The last thing in the left menu area is the logout button. When you click on it, the game will log you out all the way but your progress with the game will not be lost. All of your production will continue and you will be visible to other players for battles. You can be logged out and still under attack and participating in battles because logging out does not stop your game progress in any way.</p>
<h3>2.2.12 Links area<img src="/img/help/image31.jpg"/></h3>
<p>There are several links in the link area. You can vote for Futureshock (creators of DrugWars) as a steem witness, control the game sound, learn about the game and visit DrugWars on Discord and Github. Links to sites outside DrugWars will be opened in new tabs and your game will not be disturbed while those connected with the game will open in the main frame of the game.</p>
<h4>2.2.12.1 Future Witness</h4>
<p>Steem blockchain has witnesses. They are people who operate a witness server where blocks are being produced. Witnesses produce blocks, maintain a price feed, play the role of consensus, and work on different things to help Steem function, grow and evolve. Witnesses get voted into their positions by Steem users and each steem user gets 30 votes. You can check the witness list and vote here: https://steemit.com/~witnesses. FutureShock, as the creator of DrugWars, is also a witness on steem blockchain. If you click on the provided link&nbsp;Vote for @future.witness and support DrugWars&nbsp;it will direct you to SteemConnect where you can easily cast your vote by following a simple procedure. DrugWars team would appreciate it if&nbsp;you give us your vote.</p>
<h4>2.2.12.2 Sound control</h4>
<p>By clicking on the sound icon <img src="/img/help/image132.jpg"/>&nbsp;you control whether or not you want to experience the DrugWars game with a little music being played in the background. You can change that preference whenever you want. For your alerts of the upcoming attacks to work, the sound feature must be turned on.</p>
<h4>2.2.12.3 About</h4>
<p>The question mark link <img src="/img/help/image88.jpg"/>will open the about content in the main frame. Here you can read the basic info, download the logo or report a bug. It also shows the changelog info and the DrugWars catchphrase and motto: &ldquo;The drugs are virtual but the money is real&rdquo;.</p>
<h4>2.2.12.4 Discord link</h4>
<p>Discord&nbsp;is a proprietary freeware&nbsp;VoIP&nbsp;application&nbsp;that allows its users to communicate through text, image, video, and audio. DrugWars has its Discord server with many different rooms. It is designed in a way that allows our players to communicate with each other and get regular and relevant information about the game. It is free and simple to use with the moderation of language done by DrugWars officers so that communication does not fall into the uncivilized gutter. You can join DrugWars discord by clicking on the link <img src="/img/help/image11.jpg"/>&nbsp;that is present on the platform and directs to https://discord.gg/vwzAdva.</p>
<h4>2.2.12.5 Github link</h4>
<p>DrugWars game is completely open sourced and transparent which means that any player is free to check out the code behind the game and follow through how the game is being developed. If you click on the last link <img src="/img/help/image124.jpg"/>&nbsp;it will open the Github page of Futureshock https://github.com/FutureShockco&nbsp;in a new tab.</p>
<h2>2.3 Right menu</h2>
<p>DrugWars is a game that financially rewards its players in cryptocurrency. The amount that is awarded each day is presented in the right menu which is composed of the Daily prizes info in 3 parts and the Heist. Prizes are independent of each other so each player can get a reward in all 4 categories or in none at all depending on his or her achievements in the game. The prizes are given every 24 hours and directly sent to players' DrugWars account.</p>
<h3>2.3.1 Daily prizes info</h3>
<p>Today's prize is the overall amount that is given to all players. It is divided into 3 parts, Battle, Daily, and Heist. Percentages show how much of the overall amount is attributed to each of those 3 categories of prizes. The information is highlighted yellow and located under the overall amount.<img src="/img/help/image69.jpg"/></p>
<p>There is a countdown clock at the top of the right menu which is counting down the time until the next payment while the current awards which a player might get are under his banner production in a single sentence line. That info can change during the day depending on the actions of the player.</p>
<p><img src="/img/help/image24.jpg"/></p>
<h4>2.3.1.1 Daily Prize</h4>
<p>Daily prize is the award a player gets based on drug production. It is calculated based on the percentage of drugs produced out of the total drug production of all players. Those who produce more drugs get a higher prize than those who have a smaller production and the prize can change with each day. If a player starts producing more drugs, this award will get bigger. It can also become smaller if the player stays on its current drug production and other players rise in theirs.</p>
<h4>2.3.1.2 Fight Prize</h4>
<p>Fight prize is the prize a player gets based on how much he or she has reduced the population. In DrugWars, each unit has a supply characteristic. Population of DrugWars is calculated by multiplying a unit with its supply and adding up all those together from all units of all players. By participating in battles, a winning player kills units from other players, those units multiplied by their supply are the amount by which the overall population has been reduced. Since different units have different supplies, it is not the same to kill 100 Hobos (supply = 100*1 = 100) and 100 Ninjas (supply = 100*5 = 500) for example. At the end of each day, results from all the battles a player has won get added together and based on the total reduction of DrugWars population, a player gets rewarded. The info about current DrugWars population is below the prizes info in the right menu,</p>
<p><img src="/img/help/image99.jpg"/></p>
<h4>2.3.1.3 Heist Prize</h4>
<p>Heist prize is the award a player gets by participating in the heist. Each day, every player can decide to invest his or her drug in the heist and get rewarded by it. Players who invest more get bigger rewards from those who invest less and since the prize is dependent on the investment of others, it may change during the day when others invest more than the player.</p>
<h3>2.3.2 Heist<img src="/img/help/image1.jpg"/></h3>
<p>Every player has an option to invest drugs in the heist every day. It is done simply by entering the amount in the white space and clicking on Deposit. If a player wants to invest all drugs, there is a button Deposit all for that. A player can deposit drugs as many times as he wants during the day but those drugs that were invested cannot be gotten back.</p>
<h2>2.4. DrugWars Live Chat</h2>
<p><img src="/img/help/image68.jpg"/></p>
<p>Live chat is located in the bottom right corner and it is collapsed by default. Clicking on the small arrow will expand it into normal size. The chat is a place where players can talk to each other in real time by entering messages and clicking enter to send them to others. There are options of private chat, group, and gang.</p>
<p><img src="/img/help/image98.jpg"/></p>
<h1>3. Gameplay</h1>
<p>There are 3 main components of gameplay in DrugWars. As a player, you can produce, battle against other players, and participate in heists. Each of those components is a complex time managed part of the game with various parts to take into consideration. The components are also intertwined and there is no one without the other. You can not battle unless you produce units just as you can not participate in the heist if you do not have any drug resources produced.</p>
<h2>3.1 Production</h2>
<p>Every player can produce two categories of things in the game: RESOURCES and UNITS. Resources are produced by buildings and used to upgrade those buildings or to produce (buy and train) units for battles. Both resources and units can be produced in a time managed way or instantly if a player decides to pay for faster production.</p>
<h3>3.1.1 Resources</h3>
<p>There are 3 types of resources in the game, drugs, weapons, and alcohol. Each resource is produced by its corresponding buildings. Each building has different amounts of resources needed for its production that rise with each level. When a player starts playing a game, he or she already has a small amount of each resource to start with. A player CAN NOT have infinite amounts of resources. The amounts of maximum resources are defined with storage buildings for every resource. The maximum level of any building is defined with the current level of headquarters. A building can not be upgraded to a level higher than the headquarters are currently. If headquarters are, for example, on level 5, all other buildings can go to level 5 and no higher until the HQ gets upgraded.</p>
<p>TIP: While there are many ways to approach strategy in DrugWars, a good starting point is a ratio of 1:2:2, meaning 1 DRUG to 2 WEAPON to 2 ALCOHOL. So if you are producing 100k drugs, you want to be around 200k each of both weapons and alcohol.</p>
<h4>3.1.1.1 Drugs</h4>
<p>Drugs are the most important resource in the DrugWars game. Players receive their daily prize based on the amount of drugs they produce but they can get drugs by either producing or by stealing them from other players in battles. To ensure that their drugs do not get stolen, players can upgrade their Drug Storage building and keep a portion of their drug resource unavailable to steal. Each building has the following information: level of the building that is over the image, name, cost for the next upgrade in resource under the name and in crypto for instant upgrade, description, and the amount of production on current and next level per day. Each building associated with drugs requires all 3 resources for upgrades; drugs, weapons, and alcohol.</p>
<h5>3.1.1.1.1 Crack House</h5>
<p><img src="/img/help/image134.jpg"/></p>
<p>Crack House is the basic drug production building that is very cheap to upgrade but also produces the least drugs in comparison with other buildings. This building is a good thing to start with when you are first starting to play the game so your production increases in time and you can afford to upgrade more useful ones. In the picture above is the example of how on current level 18 a player produces 7.34 thousand drugs every day with this building while he will produce 7.81 thousand drugs on level 19. Since the resources are in white, it indicates he has enough of them. If he clicks on the &ldquo;upgrade&rdquo; button he would have to wait for 41 minutes and 28 seconds for the upgrade to finish and for the building to rise in level.</p>
<h5>3.1.1.1.2 Hydroponic Farm</h5>
<p><img src="/img/help/image84.jpg"/></p>
<p>This building is next in line when it comes to producing drugs. It is still in the category of fairly cheap buildings when it comes to producing drugs. In the picture above is the example of how on current level 6 a player produces 8.24 thousand drugs per day with this building while he would produce 9.71 thousand on level 7. Since the resources are in white, it indicates that he has enough of them. If he clicks on the &ldquo;upgrade&rdquo; button he will have to wait for 41 minutes and 28 seconds for the upgrade to finish and for the level of the building to rise.</p>
<h5>3.1.1.1.3 Meth Lab</h5>
<p><img src="/img/help/image128.jpg"/></p>
<p>The Meth Lab has a medium production of drugs and first to consider if you want to produce drugs seriously. In the example above, a player has production of 18.14 thousand drugs with this building per day while he will have that one of 21.98 when he upgrades the building to level 6. Since the resources are in white, it indicates he has enough of them.</p>
<h5>3.1.1.1.4 Cocina</h5>
<p><img src="/img/help/image46.jpg"/></p>
<p>Cocina is the second drug production building with medium production. Costs of her upgrade are much higher than of other buildings but so is her production. In the example above, a player produces 54.43 thousands drugs with it per day while he would produce 65.94 thousand when he upgrades it to the next level. Cost for upgrades in white indicates that a player has enough of them while the red amount of weapons and alcohol shows that player does not have enough. Lack of necessary resources has disabled the upgrade button which now has &ldquo;miss resources&rdquo; instead but instant upgrades with crypto are still available.</p>
<h5>3.1.1.1.5 Pharmaceutical Lab</h5>
<p><img src="/img/help/image126.jpg"/></p>
<p>Pharmaceutical lab is the most expensive drug production building but it is also the one which has the highest production. It massively produces drugs and you will not go wrong if you focus on upgrading it regularly to ensure your dominance in the game. In the example above, a player produces 153.86 thousands of drugs with this building per day at level 6 while he would produce 181.2 thousand on the next, seventh level. All his resources needed for the upgrade are in the red which indicates he is lacking them and can only be upgraded by paying with crypto.</p>
<h5>3.1.1.1.6 Drug Storage</h5>
<p><img src="/img/help/image41.jpg"/></p>
<p>Drug storage is the only drug building that does not produce drugs. This building has two functions, it stores drugs and it keeps them safe. A player CANNOT have an infinite amount of drugs. The maximum amount of drugs that a player may hold is defined with drug storage and by upgrading its level, the storage increases. There is a possibility that some other building requires more drugs than a player can have unless he upgrades the storage enough. For example, a building needs 500K drugs for the upgrade but the maximum that a player can have is 450K. He will not be able to collect that amount of drugs if he does not upgrade his drug storage accordingly. All drug production that is above the storage capacity is NOT saved anywhere and is going to waste to upgrade your storage to make sure you are not producing drugs for nothing.</p>
<p>The second function this building has is the safe. A certain amount of drugs are being kept safe in the building and can not be stolen in battles when a player loses. With each level, the amount that is safe from stealing increases so a player even when losing a battle will not lose all of his resources.</p>
<p>Drug Storage is limited to the level of the Headquarters. If the Headquarters is level 10, Drug Storage can be up to level 10.</p>
<h4>3.1.1.2 Weapons</h4>
<p>Weapons are the second resource in DrugWars. There are needed for upgrades of buildings and purchases of units. This resource (just as any other) can get stolen if a player loses a battle but he can keep a portion of it safe by upgrading his weapon storage. Each building has the following information: level of the building that is over the image, name, cost for the next upgrade in resource under the name and in crypto for instant upgrade, description, and the amount of production on current and next level per day. Each building associated with weapons requires resources of drugs and alcohols for its upgrade while the weapon storage needs all 3 resources.</p>
<h5>3.1.1.2.1 Ammunition Factory</h5>
<p><img src="/img/help/image78.jpg"/></p>
<p>Ammunition factory is the basic weapon production building that is very cheap to upgrade but also produces the least weapons in comparison with other buildings. This building is a good thing to start with when you are first starting to play the game so your production increases in time and you can afford to upgrade more useful ones. In the picture above is the example of how on current level 18 a player produces 14.68 thousand weapons every day with this building while he will produce 15.63 thousand weapons on level 19. Since the resources are in white, it indicates he has enough of them. If he clicks on the &ldquo;upgrade&rdquo; button he would have to wait for 46 minutes and 38 seconds for the upgrade to finish and for the building to rise in level.</p>
<h5>3.1.1.2.2 Weapon Factory</h5>
<p><img src="/img/help/image127.jpg"/></p>
<p>This building is next in line when it comes to producing weapons. It is still in the category of fairly cheap buildings when it comes to producing weapons. In the picture above is the example of how on current level 11 a player produces 25.32 thousand weapons per day with this building while he would produce 27.87 thousand on level 12. Since the resources are in white, it indicates that he has enough of them. If he clicks on &ldquo;upgrade&rdquo; button he will have to wait for 55 minutes and 5 seconds for the upgrade to finish and for the level of the building to rise.</p>
<h5>3.1.1.2.3 Smuggle</h5>
<p><img src="/img/help/image85.jpg"/></p>
<p>Smuggle is the building with medium production of weapons and first to consider if you want to produce weapons seriously. In the example above, a player has production of 50.86 thousand weapons with this building per day while he will have that one of 57.02 when he upgrades the building to level 10. Since the resources are not all in white, it indicates he hasn't got enough of them. The only way to upgrade the building is by buying an instant upgrade with crypto or by waiting until he has enough resources for a time managed upgrade.</p>
<h5>3.1.1.2.4 Black Market</h5>
<p><img src="/img/help/image86.jpg"/></p>
<p>Black Market is the second weapon building with medium production. Costs of her upgrade are much higher than of other buildings but so is her production. In the example above, a player produces 97.07 thousands weapons with it per day while he would produce 111.97 thousand when he upgrades it to the next level. Cost for upgrades in red indicates that a player hasn't got enough of them. Lack of necessary resources has disabled the upgrade button which now has &ldquo;miss resources&rdquo; instead but instant upgrades with crypto are still available.</p>
<h5>3.1.1.2.5 3D Metal Printing</h5>
<p><img src="/img/help/image51.jpg"/></p>
<p>3D metal printing is the most expensive weapon production building but it is also the one which has the highest production. It massively produces weapons and you will not go wrong if you focus on upgrading it regularly to ensure your dominance in the game. In the example above, a player produces 181.44 thousands of weapons with this building per day at level 5 while he would produce 219.8 thousand on the next, sixth level. All his resources needed for the upgrade are in the red which indicates he is lacking them and can only be upgraded by paying with crypto.</p>
<h5>3.1.1.2.6 Weapon Storage</h5>
<p><img src="/img/help/image43.jpg"/></p>
<p>Weapon storage is the only weapon building that does not produce weapons. This building has two functions, it stores weapons and it keeps them safe. A player CAN NOT have an infinite amount of weapons. The maximum amount of weapons that a player may hold is defined with weapons storage and by upgrading its level, the storage increases. There is a possibility that some other building requires more weapons than a player can have unless he upgrades the storage enough. For example, a building needs 500K weapons for the upgrade but the maximum that a player can have is 450K. He will not be able to collect that amount of weapons if he does not upgrade his weapons storage accordingly. All weapons production that is above the storage capacity is NOT saved anywhere and is going to waste to upgrade your storage to make sure you are not producing weapons for nothing.</p>
<p>The second function this building has is the safe. A certain amount of weapons are being kept safe in the building and can not be stolen in battles when a player loses. With each level, the amount that is safe from stealing increases so a player even when losing a battle will not lose all of his resources. The example above shows the building that is currently under upgrade and will raise to level 20 in 1 hours 2 minutes and 50 seconds.</p>
<p>Weapon Storage is limited to the level of the Headquarters. If the Headquarters is level 10, Weapon Storage can be up to level 10.</p>
<h4>3.1.1.3 Alcohol</h4>
<p>Alcohol is the third resource in DrugWars. It is needed for upgrades of buildings and purchases of units. This resource (just as any other) can get stolen if a player loses a battle but he can keep a portion of it safe by upgrading his alcohol silo. Each building has the following information: level of the building that is over the image, name, cost for the next upgrade in resource under the name and in crypto for instant upgrade, description, and the amount of production on current and next level per day. Each building associated with alcohol requires resources of drugs and weapons for its upgrade while the alcohol silo needs all 3 resources.</p>
<h5>3.1.1.3.1 Traditional Distillery</h5>
<p><img src="/img/help/image34.jpg"/></p>
<p>Traditional distillery is the basic alcohol production building that is very cheap to upgrade but also produces the least alcohol in comparison with other buildings. This building is a good thing to start with when you are first starting to play the game so your production increases in time and you can afford to upgrade more useful ones. In the picture above is the example of how on current level 18 a player produces 14.68 thousand alcohol every day with this building while he will produce 15.63 thousand weapons on level 19. Since the resources are in white, it indicates he has enough of them. If he clicks on the &ldquo;upgrade&rdquo; button he would have to wait for 44 minutes and 18 seconds for the upgrade to finish and for the building to rise in level.</p>
<h5>3.1.1.3.2 Bar</h5>
<p><img src="/img/help/image109.jpg"/></p>
<p>This building is next in line when it comes to producing alcohol. It is still in the category of fairly cheap buildings when it comes to producing alcohol. In the picture above is the example of how on current level 10 a player produces 22.81 thousand alcohol per day with this building while he would produce 25.32 thousand on level 11. Since the resources are in white, it indicates that he has enough of them. If he clicks on the &ldquo;upgrade&rdquo; button he will have to wait for 50 minutes for the upgrade to finish and for the level of the building to rise.</p>
<h5>3.1.1.3.3 Brewery</h5>
<p><img src="/img/help/image114.jpg"/></p>
<p>Brewery is a building with medium production of alcohol and first to consider if you want to produce alcohol seriously. In the example above, a player has production of 50.86 thousand alcohol with this building per day while he will have that one of 57.02 when he upgrades the building to level 10. Since the resources are not all in white, it indicates he hasn't got enough of them. The only way to upgrade the building is by buying an instant upgrade with crypto or by waiting until he has enough resources for a time managed upgrade.</p>
<h5>3.1.1.3.4 Castle</h5>
<p><img src="/img/help/image66.jpg"/></p>
<p>Castle is the second alcohol building with medium production. Costs of her upgrade are much higher than of other buildings but so is her production. In the example above, a player produces 82.43 thousands alcohol with it per day while he would produce 97.07 thousand when he upgrades it to the next level. Cost for upgrades in red indicates that a player hasn't got enough of them. Lack of necessary resources has disabled the upgrade button which now has &ldquo;miss resources&rdquo; instead but instant upgrades with crypto are still available.</p>
<h5>3.1.1.3.5 Industrial Distillery</h5>
<p><img src="/img/help/image3.jpg"/></p>
<p>Industrial distillery is the most expensive alcohol production building but it is also the one which has the highest production. It massively produces alcohol and you will not go wrong if you focus on upgrading it regularly to ensure your dominance in the game. In the example above, a player produces 181.44 thousands of alcohol with this building per day at level 5 while he would produce 219.8 thousand on the next, sixth level. All his resources needed for the upgrade are in the red which indicates he is lacking them and can only be upgraded by paying with crypto.</p>
<h5>3.1.1.3.6 Alcohol Silo</h5>
<p><img src="/img/help/image61.jpg"/></p>
<p>Alcohol silo is the only alcohol building that does not produce alcohol. This building has two functions, it stores alcohol and it keeps it safe. A player CAN NOT have an infinite amount of alcohol. The maximum amount of alcohol that a player may hold is defined with alcohol silo and by upgrading its level, the storage increases. There is a possibility that some other building requires more alcohol than a player can have unless he upgrades the silo enough. For example, a building needs 500K alcohol for the upgrade but the maximum that a player can have is 450K. He will not be able to collect that amount of alcohol if he does not upgrade his alcohol silo accordingly. All alcohol production that is above the storage capacity is NOT saved anywhere and is going to waste to upgrade your storage to make sure you are not producing alcohol for nothing.</p>
<p>The second function this building has is the safe. A certain amount of alcohol is being kept safe in the building and can not be stolen in battles when a player loses. With each level, the amount that is safe from stealing increases so a player even when losing a battle will not lose all of his resources.</p>
<p>Alcohol Silo is limited to the level of the Headquarters. If the Headquarters is level 10, Alcohol Silo can be up to level 10.</p>
<h4>3.1.1.4 Office Production</h4>
<p>Office buildings do not produce anything but are, in a way, the most important ones to have and upgrade on a regular basis. Buildings have unique specialities and are necessary for other gameplay. Some of them are even required for other actions in the game and a player is not able to access the entire game without them. Each office building has the following info presented: name, level that is over the image, cost for upgrade in resources, description, time needed for upgrade with resources and the cost in crypto for instant upgrade.</p>
<h5>3.1.1.4.1 Headquarters</h5>
<p><img src="/img/help/image121.jpg"/></p>
<p>Headquarters is the first building a player should upgrade and the most important building in the game. This building determines the levels of all other buildings which can not be higher than HQ. If a player has HQ level 20 like in the example above, all his other buildings can be upgraded up to level 20. They can not be upgraded to level 21 until headquarters is upgraded to level 21. The level of HQ also defines the time necessary for upgrades of other buildings and the higher its level, the shorter that time is.</p>
<h5>3.1.1.4.2 Training Facility</h5>
<p><img src="/img/help/image6.jpg"/></p>
<p>Training facility is the building that allows players to purchase units for battles. If this building is not at level one at least, a player will not be able to purchase units and attack other players. He will also be vulnerable when others battle against him because he will have no units to defend him. Once this building is built, each new level will reduce the time for purchasing units. If a player decides to purchase units with crypto more frequently than with resources, this building can stay at a low level because buying units with crypto is instant and not time managed which means there is no need for upgrading the building to higher levels.</p>
<h5>3.1.1.4.3 Operation Center</h5>
<p><img src="/img/help/image7.jpg"/></p>
<p>Operation center is linked to all resource production buildings. It works in a simple way, all your income in drugs, weapons, and alcohol is raised by 0.5% with each level. Operation center does not influence any of the daily awards, it only raises your daily production of resources. For example, if a player has operation center at level 20, his production will be bigger by 10% because 20 * 0.5 = +10%</p>
<h5>3.1.1.4.4 Pantheon</h5>
<p><img src="/img/help/image49.jpg"/></p>
<p>Pantheon is the only building in DrugWars that influences players' activity outside of the game instead of inside. After each battle, a player has an option to share his wins on social networks or DrugWars forum. If he chooses to share it or the forum, he may get a small reward in return. DrugWars team is upvoting DrugWars battle shares on forum and the higher the Pantheon level, the higher the upvote is. Upvotes are NOT mandatory, a player has a chance to be upvoted but will probably not always have that luck. Higher levels of this building do not increase the chances of an upvote but increase its value if the upvote is given. DrugWars team is also upvoting content that is of high quality and related to the game and other players. Posts that are high in value, interesting and of use to other players have bigger chances of getting upvoted than those of simple battle shares.</p>
<h5>3.1.1.4.5 Research Center</h5>
<p><img src="/img/help/image76.jpg"/></p>
<p>The Research Center is the building necessary for unit training. Besides simple purchasing of units, each player can train his units in various skills available in training. If a player does not have a Research Center on at least level 1, training will not be available. This building determines the level of every training in a way that the maximum level of each training must match the level of the Research Center. If a player, for example, if the Research Center is at level 5, training can only be upgraded up to level 5.</p>
<h4>3.1.1.5 Defense Production</h4>
<p>Defense production provides defensive systems around your base. Each area of production addresses a specific area of defense.</p>
<h5>3.1.1.5.1 Cameras</h5>
<p>Cameras provide you with information on incoming players to your base.</p>
<h5>3.1.1.5.2 Dogs</h5>
<p>Dogs attack only one time in the second round. They are powerful against Melee units (as the Security System is for Range units).</p>
<h5>3.1.1.5.3 Defense Troops</h5>
<p>These troops defend by attacking after the first round and cannot be killed.</p>
<h5>3.1.1.5.4 Emergency</h5>
<p>The Emergency hospital revives a small percentage of your troops. This is applied once after the fighting has ended.</p>
<h5>3.1.1.5.5 Security System</h5>
<p>An advanced security system for Range units (as Dogs are for Melee) that attacks in even numbered rounds, starting at round two to round six.</p>
<h5>3.1.1.5.6 Hidden Mines</h5>
<p>A first line of defense, using splash damage triggered at the first round only.</p>
<h3>3.1.2 Units</h3>
<p>Units are expendable pieces of the DrugWars game. They are purchased, trained and used in battles. When a unit dies in battle, the player's number of that unit decreases by the number that had just died but he can buy more as often and as much as he wants. There is no limit to quantity or quality of the units.To be able to purchase units, a player must first have the Training facility building and if he wants to train them then he needs to have the Research Center. Both of those buildings are office buildings and can be upgraded accordingly.</p>
<p>Each unit is unique in her skill set and cost. Some units are malee which means they are for close combat while some are range or battling from a distance. Units are the only thing in the DrugWars game that have a number over the picture that does not stand for level. Whenever you see a number over an image in DrugWars with buildings or training, it represents the level while with units, it represents the number of units that a player currently has.</p>
<p>Each unit has the following information next to it: picture and number of units a player has over it, description and info about unique abilities, cost in resources, supply, offense and resistance skills, time needed for time managed recruitment, and the cost for recruitment paid with crypto. Time needed for time managed recruitment can be shortened with higher levels of Training Facility building.</p>
<h4>3.1.2.1 Recruiting Units</h4>
<p>To recruit (purchase) units, a player needs to have the necessary resources (different for different units), enter the amount he wants to recruit in the white space and click on the green recruit button. If resources are missing, the green recruit button will be replaced with black one that says &ldquo;missing resources&rdquo;. A player can, at any time, choose to recruit his units by paying for them with crypto in which case the resources are not necessary and the purchase is instant and not time managed.</p>
<h5>3.1.2.1.1 Hobo</h5>
<p>Hobo is the cheapest unit to recruit and the only one that requires only one resource for purchase. This unit has no defense and will die if he meets his enemy at the end of the first round. Hobos are fairly slow and can not carry much which means they are not very good for sending resources to other players.<img src="/img/help/image9.png"/></p>
<h5>3.1.2.1.2 Rowdy</h5>
<p>Rowdy is a unit that fights in groups of four so be sure to always send rowdies to battle in a number that can be divided by 4 to assure their maximum efficiency. Rowdy has no defense against fire and chemical weapons and can defend only against physical damage and bullets.<img src="/img/help/image125.png"/></p>
<h5>3.1.2.1.3 Super Bouncer</h5>
<p>Super bouncer is a medium strong unit for close combat but has a fairly weak defense. His special ability is his shield which he can use once and obtain +200 more health which makes him harder to kill in battles.<img src="/img/help/image54.png"/></p>
<h5>3.1.2.1.4 Big Mama</h5>
<p>Big Mama is the only unit with healing abilities because she can heal up to 5 units for 200HP in every round. She is fairly slow but has medium offense and defense and is not an easy unit to kill.<img src="/img/help/image19.png"/></p>
<h5>3.1.2.1.5 Knifer</h5>
<p>Knifer is a solid unit when it comes to his skills in battle but be careful because this unit does not follow rules. This means that he does not follow priority in battles and can attack sooner or later than he is supposed to.<img src="/img/help/image16.png"/></p>
<h5>3.1.2.1.6 Gunman</h5>
<p>Gunman is a pretty strong range unit that takes out melee units from a safe distance. His aim is almost perfect so his accuracy ensures bonus damage. His defense is low, however, because he is not very good at defending himself in close combat.<img src="/img/help/image25.png"/></p>
<h5>3.1.2.1.7 Lawyer</h5>
<p>Not all men are born for fighting, some have other useful skills. If you send a lawyer in battle, he will reduce the amount your opponent has in his safe by 0.01% which means you can steal even some resources that your opponent is not expecting you too, up to 5% that are in his safe. This unit is a genius in battle but will hide behind big mama to protect himself.<img src="/img/help/image77.png"/></p>
<h5>3.1.2.1.8 Spy</h5>
<p>Spy is not a good choice for battles but an excellent one for spying. Before starting a normal attack, a player can send only a spy in battle and his spy will return with valuable information about the opponent such as buildings and number of units an opponent has. With knowing what units will wait for him, players can strategize and choose which units to send in battle more carefully.<img src="/img/help/image29.png"/></p>
<h5>3.1.2.1.9 Sniper</h5>
<p>Sniper is an excellent choice for battles. He is a range unit that kills your opponents units from a distance with increases to his damage with each round. His damage will be greater by 1.5*x where x is the number of rounds which means he will deal the most damage in the last round.<img src="/img/help/image122.png"/></p>
<h5>3.1.2.1.10 Hitman</h5>
<p>Hitman is a strong range unit that a player can not go wrong with. This unit has a special ability of a multiple hit because he takes down two targets at once with his two guns, one in each hand. He is fast and with excellent offense and defense skills.<img src="/img/help/image40.png"/></p>
<h5>3.1.2.1.11 Ninja</h5>
<p>Ninja is the second female unit. She has cat-like reflexes and you can say she has more than one life just as a cat. Ninja can dodge two deadly hits and it doesn't even matter how strong they are. This, in combination with her great offense skills, makes her quite powerful. <img src="/img/help/image62.png"/></p>
<h5>3.1.2.1.12 Bazooka Guy</h5>
<p><img src="/img/help/image70.jpg"/></p>
<p>Bazooka guy is a good unit to have if you want to up your chances of winning a battle. This unit will hit not one, not two but 10 enemies at once and is generally very good with all his offense skills.</p>
<h5>&nbsp;3.1.2.1.13 Occupation Troop</h5>
<p><img src="/img/help/image92.jpg"/></p>
<p>This is the only unit which is not used in battles. To occupy a territory and create a new base, a player needs to send this unit in to make room. This unit is slow but can carry a lot and is safe from attacks so if you want to expand your empire and create more bases, send these in. The Occupation Troop is disposable, it creates the new base and is consumed into it. Once you send it to create a new base, the unit is gone. Your new base is created instantaneously.</p>
<h5>3.1.2.1.14 Mercenary</h5>
<p><img src="/img/help/image97.jpg"/></p>
<p>Mercenary is the most expensive unit but also the strongest one. This unit has exceptional defense and offense skills and will help you win in battles. His unique skills is his bulletproof vest which helps him to obtain back 25HP when re reaches 0 so just as your opponent will think your mercenary is dead, surprise, no he is not.</p>
<h4>3.1.2.1 Training units</h4>
<p>Unit training is an option that every player can take advantage of. To be able to train their units, players first need to have the Research Center building and all training can go as much up in levels as the Research Center. If your Research Center is level 10, your training levels are limited to level 10. Some training affects all units while others are specifically designed for some or only specific type of units. Each training has the following information next to the image: description, unique advantage, cost in resources, time required for time managed upgrades and the price for instant upgrade in crypto.</p>
<h5>3.1.2.1.1. Routing</h5>
<p><img src="/img/help/image64.jpg"/></p>
<p>Routing is training of all units in speed. With each level, all units will have increased speed by 0.5%.</p>
<h5>3.1.2.1.2. Close Combat</h5>
<p><img src="/img/help/image95.jpg"/></p>
<p>Close combat is training of only melee units (those who fight in close combat) in physical damage. With each level, melee units will increase the physical damage they give in battles by 1%.</p>
<h5>3.1.2.1.3. Introduction to pistol, rifle, and shotgun</h5>
<p><img src="/img/help/image26.jpg"/></p>
<p>This training is only for range units and it has the same function as close combat has for melee. Pistol, rifle &amp; shotgun will increase the physical damage units give in battles by 1% with each level of training.</p>
<h5>3.1.2.1.4. Information procurement</h5>
<p><img src="/img/help/image104.jpg"/></p>
<p>Information procurement is training for all types of units that removes the fog of war.</p>
<h5>3.1.2.1.5. Sniper trains</h5>
<p><img src="/img/help/image17.jpg"/></p>
<p>Sniper Trains is (as the name suggests) training for only snipers. With each level of training, snipers will get to give 1% more of physical damage to opponents.</p>
<h5>3.1.2.1.6. Spirit wine</h5>
<p><img src="/img/help/image90.jpg"/></p>
<p>Spirit wine is training specifically designed for the Hobo unit. Since this unit is fairly weak and dies when he meets his enemy at the end of the round, training it seems logical. With each level of training Hobos will give 1% more physical damage to their opponents.</p>
<h5>3.1.2.1.7. Coordination</h5>
<p><img src="/img/help/image45.jpg"/></p>
<p>Coordination is for all units. With each level of training, units will have increased offensive and defensive power by 1%.</p>
<h5>3.1.2.1.8. Chemical training</h5>
<p><img src="/img/help/image105.jpg"/></p>
<p>Chemical training is for all units. With each level of training, units will produce greater chemical damage to their opponents by 1%.</p>
<h5>3.1.2.1.9. Weapon master</h5>
<p><img src="/img/help/image14.jpg"/></p>
<p>Weapon master is training for all unit types. With each level of training, units will give greater weapon damage by 1% to their opponents.</p>
<h5>3.1.2.1.10. Fire training</h5>
<p><img src="/img/help/image71.jpg"/></p>
<p>Fire training is for all unit types. This training will increase fire damage by 1%.</p>
<h5>3.1.2.1.11. Protection</h5>
<p><img src="/img/help/image73.jpg"/></p>
<p>Protection is training for all unit types. With each level of this training, all units will be better at defense by 1%. [NOTE: image shows only 0.5%]</p>
<h5>3.1.2.1.12. Bomb construction</h5>
<p><img src="/img/help/image120.jpg"/></p>
<p>Bomb construction is training specifically for the Bazooka unit. With each level of training Bazookas will give 1% more damage to their opponents.</p>
<h5>3.1.2.1.13. Psychological training</h5>
<p><img src="/img/help/image30.jpg"/></p>
<p>Psychological training is specifically designed for Elite units (Big Mama, Knifer, Ninja, and Mercenary). With each level, damage that Elite units produce will be higher by 0.5%.</p>
<h2>3.2 Player location on the map<img src="/img/help/image108.jpg"/></h2>
<p>Once you click on the Map&nbsp;in the left menu, a rotating Earth image will appear in the main frame. You will notice how it has a lot of small hexagons on it. Each hexagon is one territory and every such territory has 225 possible base locations. You will also notice how those hexagons are in different colors. There is black, green, yellow, orange, red, and blue. Those colors indicate&nbsp;how dangerous a specific territory is where black is empty, green means that there is an inexistent or low danger, yellow is moderate and orange and red considerable and even high. Only blue locations are different because they are implicating how there will soon be missions on them.</p>
<p>Every player has one free base location to choose. That primary base has no required resources or obligations for a player in any way, it is completely free and simple to choose. Every player can set up to 5 bases if he wishes&nbsp;(they are not mandatory) but those 4 additional ones require some investment in the terms of purchasing a special unit that will establish them.</p>
<h3>3.2.1 Choosing primary base location</h3>
<p><img src="/img/help/image42.jpg"/></p>
<p>When you log into the DrugWars&nbsp;game, it will tell you how you need to choose a location on the map first. Until you do that, you will not be able to play the game or see the resources that you have. You can either click on the green link under your image that says "SELECT THE LOCATION"&nbsp;or click on the map&nbsp;in the left menu. Both will get you to the same place, they will open the rotating world map with hexagons on it.</p>
<p>To pick your primary base, click on the map in the left menu. When the world map appears in the main frame you can either watch how it spins and look at different territories or you can click and drag your mouse to rotate it manually. When you click on any hexagon territory, a small window will pop-up next to it with the information on how many bases are already in that territory and how many are free. Keep in mind that it is giving you information about bases, not players. If it says there are 4 bases there, it can mean that those 4 bases can be owned by 1,2,3, or 4 different players. When you have chosen your preferred territory, click on the hexagon that represents it.</p>
<p><img src="/img/help/image116.jpg"/></p>
<p>Once you have clicked on the territory, base locations will open in a grid. Every territory grid has 225 base locations. Those which are in red color have already been claimed by another player and you can find out who by clicking on them. Those which are in black color are free and available for you to choose them as your primary base location.</p>
<p><img src="/img/help/image44.jpg"/></p>
<p>From those available black base locations, you need to choose one for your primary base. When you click on the one you desire, you will need to confirm it by clicking on the blue button CHOOSE AS PRIMARY BASE. Your base will from then on be colored green in the base grid of that territory and the information about your primary base location will be under your image and in the right corner of the main frame. Those players that will have more than one location will always know which base they are on by reading what it says in that right corner or under their image. The first number is territory while the second one is the base in that territory. In the example below, the primary base is territory 442 and location 1.</p>
<p><img src="/img/help/image36.jpg"/></p>
<h3>3.2.2 Choosing secondary base locations</h3>
<p>Every player can have up to 9 additional bases (a total of 10, 1 primary and 9 additional). The process is very similar to choosing the primary base except it requires a special unit called Occupation Troop. A player must first recruit this unit to be able to get an additional base with it.</p>
<p><img src="/img/help/image28.jpg"/></p>
<p>Occupational troop has the potential to create a new base. If you use it for that purpose, it will transform itself into the base which means that you will not have that unit anymore. The unit will not return once the base is set because the unit has become the base itself. In addition to occupying territory and creating bases, this unit can also transport resources from one base to another and station units. This is a good thing to do in order to assure enough resources in additional bases to start building upgrades and unit recruitment.</p>
<p>When you choose your base location (in the same way as for the primary one) and click on a base in the desired territory, the blue button will now say CREATE NEW BASE. Once you click on it, it will divert you to choose the unit for that action. You need to select one Occupational troop by entering the number in the blank space and clicking on the image of the unit (just as you would select units for battle). Your coordinates will already be set but you can change them if you wish and you need to enter the name of your new base. When you have your occupational troop selected, coordinates of the base, and the new base name, click on OCCUPY&nbsp;and your base will be created.</p>
<p>Each player can have 10 bases, so you can create up to 9 additional bases in addition to your primary base.</p>
<h3>3.2.3 Production of buildings and units</h3>
<p>Each base has its own production, buildings, and units. From the Headquarters to Alcohol Silo, players can upgrade their buildings in every base individually. It is like playing five games at once if you have 5 base locations. Those upgrades can be simultaneous so while you are upgrading the Cocina in one base there is no problem in upgrading Black Market in another and the Bar in the next. The same goes for recruiting units.</p>
<p>Be careful what you are building and where. Before starting any upgrade make sure that you are doing it in the base that you want. You can always see which base you are on because it is stated under your image and in the upper right corner of the main frame. To switch between locations, simply click on the small arrow next to the primary base to expand the list of bases and click on the one you want. Once you do that, the chosen base will be the one you are currently in. By producing resources in more than one base and transporting them, you will not only collect them faster and be able to upgrade more buildings but also have bigger drug production and as a result, higher daily rewards. Your information about resource production in the top banner will change according to the base you are currently on but you can see your total production from all bases if you click on overview&nbsp;in the left menu. That total production is what your daily prize is based upon.Your daily prize is for your total drug production from all bases added together.</p>
<p>Since you can station units from one base in another one, it would be silly that 5 of your hobos were trained to level 6, for example, and another 15 to level 2. All your units are at the same level of any training at all times. This means that training will not be different from one base to another. It will be the same. By upgrading training in one base, it will automatically rise in level in all base locations once the upgrade is finished.</p>
<h2>3.3 Battles</h2>
<p>Battling against other players is the key feature of the DrugWars game. By attacking other players and by defending themselves against attacks, players can get rewarded in more than one way. Each battle will assure that some amount of resources from the opponent goes to the winner of the fight and based on how much he reduced the DrugWars population, players will receive additional daily reward in crypto. You can read about the rewards from battles here Battle prize.</p>
<h3>3.3.1 Preparing for a battle</h3>
<p>A player can not attack other players if there are no units to go to that attack. To be able to attack, there first need to be units present. In order to have a bigger chance of victory, those units can be trained and the target should be chosen carefully. Additionally, there is a fight simulator that can help players see in advance how the fight is going to look like. If the opponent does not change his unit number and defensive buildings in the meantime, the attacker can expect the battle to go as the simulator predicted.</p>
<h4>3.3.1.1 Unit production and training</h4>
<p>To be able to participate in battles, players need to produce their units and train them if they want to assure their skills are even better. Unit production can be at every single base while unit training is the same for all bases. To learn more about unit production and training, read Units.</p>
<h4>3.3.1.2 Choosing targets</h4>
<p>The best way to assure your target is not too strong for you is to spy on it with the unit Spy. This unit will bring you back a lot of valuable information about how many units your opponent has and some other useful info. If that player does not produce more units in the meantime, you can assume he has what your Spy told you. Simply attack a player with the Spy unit and wait for it to return. To attack a player, you need to enter the location of his base you will attack or find the base on the map and attack from there.</p>
<h4>3.3.1.3 The fight simulator</h4>
<p>Once you have learned how many units your opponent has, and you know which units you will send into battle, access the fight simulator here: https://simulator.drugwars.io/&nbsp;and enter the numbers of units you both have. When you click on submit, the simulator will give you information about the battle process and what happens at each round. You will know who the winner will be of that potential fight too. To assure your victory, play with the simulator a bit and enter different unit numbers for your attack. This way you will see different scenarios that may take place. Keep in mind that since all battles have a time delay, the simulator information will be true only if your opponent does not make any changes to his units in the meantime.</p>
<h4>3.3.1.4 Unit order and grouping</h4>
<p>When starting a fight, a player needs to know how there is an attack order among units. That order can be seen in units.json&nbsp;file of DrugWars GitHub and it goes like this: Spy, Hobo, Rowdy, Bouncer, Knifer, Big Mamma, Lawyer, Ninja, Gunman, Sniper, Hitman, Bazooka, Mercenary. This means that Bouncers, for example, will always attack before Gunman and so on.</p>
<p>The same units are grouped together, they fight together and their progress in the simulator is shown one after another. If a player goes into battle with 2 Super Bouncers, those 2 Super Bouncers will attack together and their information will be presented one line at a time.</p>
<h3>3.3.2 Battle process</h3>
<p>The battle takes place in rounds and it ends either when all the units from one side are dead or until all rounds are finished. Attacking units can only attack one of the opposing team's groups per round and both the attack and the defend side units are in the battle based on their unit order. At each round the unit may lose its HP based on its defense and the attacker strength on it. For example, a layer with 2000 HP and 50 DEF can take 450 DMG from Big Mamma and his HP will drop to 1550 HP. If there are 5 Big Mammas, they will deal 5*450=2250 DMG and the lawyer will be dead.</p>
<p>Since damage goes both ways, be sure that lawyer units will be protected by Big Mamma units. He will assign 120 DMG to Big Mamma and get her HP from 21000 to 20880. To simplify, let us see what happens with one Lawyer and one Big Mamma:</p>
<p>Lawyer: HP 2000, attack 200, and defense 50</p>
<p>Big Mamma: HP 21000, attack 500, and defence 80</p>
<p>Big Mamma attacks Lawyer with an attack&nbsp;of strength 500 but since he has a defense of 50, the attack he gets is 450 which means his HP gets from 2000 to 1550. At the same time, while defending himself, he deals Big Mamma damage of 200 but since Big Mamma has defence of 80, she gets 120 damage (because 200-80=120) and her HP is now 20880.</p>
<p>Each round can be seen as the attack on one defending unit where the attacking units take turns&nbsp;at attacking while the defending unit gives them some damage during his defending. For example, if there are 2 Bouncers, 2 Big Mammas and 1 Knifer attacking 5 Rowdies and 5 Lawyers, one round will be the attack on Rowdies and another round will be the attack on Lawyers. All Bouncers, Big Mammas and Knifer will attack Rowdies and assign damage, Rowdies will give them damage during defense. All Bouncers, Big Mammas and Knifer will attack Lawyers and assign damage, Lawyers will give them damage during defense. If there are units still left alive, the process continues. This, of course, depends on the training&nbsp;of the units too since different training will help units be better at attacking and defending themselves.</p>
<h3>3.3.3 Battle rewards</h3>
<p>The winner of the battle gets to loot the loser. The amount of resources the winner can loot is defined with how much of those resources the loser has and is not in the safe just as it is defined with the winning units that have survived. Each unit has a carry capacity and only surviving units can carry loot back home. For example, Super Bouncer can carry 400 and if there are 5 alive after battle, they can carry 2000 resources. Winner can loot all 3 resources, drugs, weapons, and alcohol.</p>
<h3>3.3.4 Sharing Battles</h3>
<p>Once a battle is over, players can share it in different social media networks: DrugWars forum, facebook, reddit, twitter, by creating a qr code, VK, and on Telegram. You first need to click on show more details when scrolling through previous battles and just under your rewards there will be a series of links you can click on to share your battle.</p>
<p><img src="/img/help/image56.jpg"/></p>
<h2>3.4 Heist</h2>
<p>Every player has an opportunity for extra daily income from Heirs. You can invest your drugs and based on your investment in comparison from other players, get crypto in return. A certain percentage of total daily prizes goes to heist (usually 2%) which is somewhere from 10K to 15K. Players who invest more in the heist will get a bigger piece of that prize while those who invest less will get less. Since you can invest as many times as you want during the day, information about your prize will be temporary because other players are also investing which means you have to keep a close eye and invest more accordingly if you want a bigger reward.</p>
<h2>3.5 Jobs<img src="/img/help/image21.png"/></h2>
<p>Jobs are an important aspect of the game. By doing jobs, you fight the DRUGWARS NPC (their army / units) and take rewards for doing so. While your production of drugs, weapons and alcohol raises your levels for upgrades and recruiting units, completing jobs brings in much greater rewards. Each player is allowed to start 15 jobs per day, the day timer can be seen on the upper right portion of the screen. The timer starts a new day at 24 hours and ends once it reaches 0 (zero).</p>
<p>When doing jobs, whether solo jobs or gang jobs, the units used do not need to have the capacity to carry the rewards back. This differs from fights, where your attacking army can only bring back up to its capacity. This value can be seen under the unit&rsquo;s Defense -&gt; Carry attribute.</p>
<p>TIP: All units can carry resources, but if you plan to carry larger amounts, like 50k-100k+, you really need to utilize the AH-64 Apache unit which can carry up to 30k combined resources.</p>
<h3>3.5.1 Jobs vs Gang Jobs</h3>
<p>Jobs are individual, or solo, jobs where the job is done by the individual player and the rewards are given to the single player. A Gang Job is done by one to many gang members and the rewards are shared amongst the daily active members of the gang.</p>
<h4>3.5.1.1 Jobs</h4>
<p>Individual Jobs are the #1 way to grow yourself in addition to letting your resources build. The rewards from these jobs are given to the individual player who does them. To do a job, you need to send an army of units capable of defeating the DRUSWARS NPC army. You can test this in the fight simulator (https://simulator.drugwars.io/).</p>
<h4>3.5.1.2 Gang Jobs</h4>
<p>Whilst one to many members can participate in a Gang Job, oftentimes a single gang member can and will complete a job on their own. This is to the benefit of the gang as it usually results in the single member losing more resources than they gain. Gang Jobs promote teamwork and comradery within the gang. Gang Jobs are a great way for the gang to help each other, especially the younger and newer members.</p>
<p>TIP: It is important to remember that the Gang Job is shared amongst all daily active members. So the more members you have, the more members take a share. The share is distributed evenly, so those who participate do not receive any more than those who do not.</p>
<h1>4. Gangs</h1>
<p>DrugWars can be played individually, as a single player with no ties to anyone. It can also be played with cooperation with others in groups that are called gangs. A player does not have to be a part of the gang to be able to play DrugWars but if he or she so chooses, there is no option of being in more than one gang. Once you are in a gang, you can still play as you would if you were not a part of it. You do not lose anything, you only gain. Different gangs have different rules of play and operate in various styles when it comes to wars and alliances with other gangs and there are many benefits a player gets by being a part of the gang. If you are in a gang, you do get a certain level of protection by other gang members in battles and your production of resources and units gets faster by gang buildings so your individual play benefits as well. You can create your own gang or join an existing one that is open to new members. There is currently a limit to how many members a gang can have that is set to 100. Each gang has 3 different roles for members, boss, capo, and soldier. There is only one gang boss who assigns capo roles to soldiers. The boss upgrades gang buildings and has the final word in everything, capos are above soldiers and below boss in the chain of command while the soldiers are the lowest in the hierarchy. To learn where the gang information is located in the game and read the instructions of creating or joining the gang, click here: GANGS.</p>
<h2>4.1 Creating a gang</h2>
<p>Instructions for creating a gang are located here: Create gang. If you have enough resources, you can start your own gang, name it as you wish and assign a logo to it. DrugWars discord server is at your service and will provide a chat room for your gang where you can talk to other members, discuss strategy and gameplay. This is also the place where you can go into more details when it comes to approving applications of your new potential members. When you create a gang, you become its gang boss and can assign capo roles to your soldiers which will give them more power and authority over your gang. Consider alliances with other gangs and build a strong gang before starting wars with others to assure your victory.</p>
<h2>4.2 Joining a gang</h2>
<p>Instructions for joining a gang are located here: Joining gang. When you are a gang member (boss, capo or soldier) there are many benefits for your individual play. As a single player, you are much stronger if you have a gang to protect your back and you are better at production too. Gang members will usually attack your enemies and your production rates will get higher with higher levels of gang buildings.</p>
<p>If you are currently in a gang and wish to join another, you apply to the new gang. If you are accepted, you will be switched to the new gang upon acceptance. When you join a gang you can&rsquo;t join another one for 48 hours.</p>
<h3>4.2.1 Gang buildings</h3>
<p>Each Gang building impacts every player in the gang. The higher the building, the bigger your benefits are. Gang members can easily donate their resources to a particular building by inputting the amount and clicking on send resources. Each building has info about its purpose, resources needed for every next level upgrade and the percentage of resources that have already been collected by donations from gang members. Those percentages are also depicted by a pie chart surrounding the resource image where the percentage of received resources is green and the resources missing are yellow. Only gang boss can upgrade the buildings by clicking on upgrade and it can be done only when all 3 resources are at 100%, otherwise, it will say missing resources where the upgrade button is.</p>
<h4>4.2.1.1 Gang headquarters</h4>
<p><img src="/img/help/image96.jpg"/></p>
<p>Gang headquarters is your main gang building and it is listed first when you click on buildings. Every other building cannot be higher than the level of your headquarters so when you see &ldquo;HG upgrade required&rdquo; where your upgrade button next to some building should be, it means that you first need to upgrade the HQ and then the building you wanted.</p>
<h4>4.2.1.2 Embassy</h4>
<p><img src="/img/help/image39.jpg"/></p>
<p>The Embassy allows the Gang to view relations with other Gangs. You can see Gangs you are at war with, allies with and the overall state of relationships.</p>
<h4>4.2.1.3 Military Academy</h4>
<p><img src="/img/help/image33.jpg"/></p>
<h4>4.2.1.4 Scientific Lab</h4>
<p><img src="/img/help/image106.jpg"/></p>
<p>The scientific lab is the gang building that influences every gang member's individual drug production. With each level, your individual drug production will be higher by 0.25%.</p>
<h4>4.2.1.5 Weapon Development Center</h4>
<p><img src="/img/help/image111.jpg"/></p>
<p>Weapon Development Center is the gang building that influences every gang member's individual weapon production. With each level, your individual weapon production will be higher by 0.5%.</p>
<h4>4.2.1.6 Distillery School</h4>
<p><img src="/img/help/image67.jpg"/></p>
<p>Distillery School is the gang building that influences every gang member's&nbsp;individual alcohol production. With each level, your individual alcohol production will be higher by 0.5%.</p>
<h3>4.2.2 Deposit</h3>
<p><img src="/img/help/image20.jpg"/></p>
<p>Deposit page will show you how much of each resource type has every player donated to each building. Buildings are listed with gang member names underneath them and the amount of resources they have donated.</p>
<h2>4.3 Diplomacy</h2>
<p>Every gang has an option to join alliances and wars with other gangs. When you click on Diplomacy you will see every other gang in your main frame with red and green options next to them.</p>
<p><img src="/img/help/image22.jpg"/></p>
<p>The green button will say OFFER ALLIANCE and the red one will say&nbsp;DECLARE WAR. If you are already at war or have an alliance with a certain gang then those two buttons will be grey with the additional blue one under them that will say STOP. Only the boss and the capos can make those decisions.</p>
<p><img src="/img/help/image4.jpg"/>&nbsp;<img src="/img/help/image38.jpg"/></p>
<h3>4.3.1 Wars</h3>
<h3>4.3.2 Alliances</h3>
<h2>4.4 Jobs</h2>
<h2>4.5. Leaving a gang<img src="/img/help/image35.png"/></h2>
<p>To leave the Gang of which you are a member, under Gangs, select your gang and find your user name/profile. Click on &ldquo;Leave Gang&rdquo;.</p>
<h1>5. Sharing resources with other players</h1>
<p>You can share your resources with other players by transporting drugs, weapons, alcohol or crypto by your units. When you click on MISSIONS in the left menu, you will see TRANSPORT in the menu above the main frame. Click on it to see the transport content of the game.</p>
<p><img src="/img/help/image8.jpg"/></p>
<p>All of your current units will be listed on the left. You will see a number under each unit that tells you how much of them you have. To transport resources, you first need to select those units you want to carry your resources. Each unit type has a different carry level (you can see the carry levels of every unit in Bootcamp). To select the unit you wish to participate in the transfer, change the number under it and click on the plus size on the image. You can add as many different units as you want but you need to select at least one. For this example, we will select 3 Hobos and 1 Ninja.</p>
<p><img src="/img/help/image58.jpg"/></p>
<p>Hobo has the carry ability of 10 and Ninja has the carry ability of 150. Since we have selected 3 hobos, 10 multiplied by 3 is 30 which is added to 150. We get a total carry of 180 resources. This means that we can transport 180 resources. Those resources can be divided in any way that math allows through the use of integers. You can send all 4 resources, just one or any other combination. For example, it can be 180 drugs or 50 drugs + 30 weapons + 100 alcohol or 10 drugs + 10 weapons + 10 alcohol + 150 crypto or any other mathematically allowed distribution. All you need to do now is enter the name of the player you wish to transport, write a message and click on TRANSPORT. When your units deliver those resources they will come back to you so do not worry about losing them. Once the resources are delivered, your resources will be lesser by the amount that you gave away.</p>
<p>If you are a gang member and click on MY GANG to see all the members, you will see there is a blue TRANSPORT&nbsp;button next to each gang member. When you click on it, it will divert you to transport content that we have covered above.</p>
<h1>6. Simulator</h1>
<p>You can access the fight simulator by going to https://simulator.drugwars.io/. The left side of the screen is your units and training numbers. The right side is either 1) the opponent unit, training and defense numbers (if you are attacking another player), or 2) the units of the NPC (if you are doing a job).</p>
<p>Clicking the simulator links within the game will often pre-fill values for you. For example, clicking on &ldquo;Open in the simulator&rdquo; after you have started a job will automatically fill your units and trainings and also the NPC units.</p>
<p>The simulator is an exact depiction of the game play fight. What it shows is how the fight will resolve.</p>
<h1>7. Card collecting</h1>
<h1>8. F.A.Q.</h1>
<h2>8.1 Are bots allowed in the game?</h2>
<p>DrugWars does not tolerate any bot automating any action in the game. This gives unfair advantage to some players and exploits the game. Bot usage is strictly monitored. Abusers will be banned immediately upon being flagged for abuse. You have the right to one appeal as to why you were flagged to explain why it may be false. After, if the infraction is the same, you are banned.</p>
<h2>8.2 Why is my shared battle not upvoted?</h2>
<p>Higher Pantheon building levels will produce higher upvote values but not all shared battles will be upvoted. Sharing a battle gives you A CHANCE of being upvoted. Upvoting battles is not mandatory or guaranteed.</p>
<h2>8.3 Is being in the gang better than playing solo?</h2>
<p>The answer depends on what kind of style a player prefers. Gang members play together and socialize more, offer protection and go on missions together. Individual players can enjoy the game and play it but some features of the game are only available to gangs since they are specifically designed for them and require more players.</p>
<h2>8.4 Can I have more than one DrugWars account?</h2>
<p>Yes, you can. If you have more than one Steem account, you can play DrugWars with each one of them individually. Additionally, you can create a DrugWars account by logging in with your social media account.</p>
<h2>8.5 Why are daily rewards going up and down?</h2>
<p>Daily rewards are dependent on investments from all players when they purchase instant upgrades with crypto. There will be days when a lot of players will purchase upgrades and the prize will get bigger just as there will be days when more players will purchase upgrades with resources and the prize will be smaller.</p>
<h2>8.6 My daily rewards are dependent on which base?</h2>
<p>You will get your daily prize based on your total drug production which is calculated by adding drug productions from all the bases. You can see your total drug production in the Overview.</p>
<h2>8.7 How do I know which base I am currently on?</h2>
<p>There is information under your logo image and in the upper right corner of the main screen. Read Player location on the map</p>
<h2>8.8 Why are my resources in red and will not go higher than a certain amount?</h2>
<p>You can not have unlimited amounts of resources. The capacity of each resource is determined with the storage building for that resource. Higher levels will allow you bigger storage just as they will allow you bigger safe storage. Upgrade your storage buildings and you will be able to store more resources.</p>
<h2>8.9 Can someone steal my base?</h2>
<p>No. Players can attack bases and steal resources but they can not destroy bases.</p>
<h2>8.10 Can I share my resources with other players?</h2>
<p>You can transfer your resources by clicking on Actions and then on transfer. Keep in mind that those resources need to be carried by units and different units have different carry capacities. To learn more, read Sharing resources with other players</p>
<h2>8.11 Why didn't I get any resources after winning a battle?</h2>
<p>If your opponent had no resources then you had nothing to steal. Keep in mind that each battle has a small time delas and a notification to your opponent. In this time, your opponent has the chance to prepare for the battle, get more units, relocate or spend his resources.</p>
<h2>8.12 Do I have to battle other players?</h2>
<p>You do not have to attack other players if you do not want to but you will have to defend yourself if they attack you, so have enough units ready. You can keep upgrading your buildings and receiving rewards based on your production but keep in mind that battles are a way to get more of those resources by looting.</p>
<h2>8.13 What is Steem Engine?</h2>
<p>Steem Engine is a smart contracts side-chain platform for the Steem blockchain. This means that it can execute custom smart contracts based on data published to the Steem blockchain. DWD tokens are created on Steem Engine. Visit it by clicking on https://steemscan.com/steem-engine. You will need to log in through SteemConnect by using your steem login&nbsp;data.</p>
<h2>8.14 How can I buy DWD tokens on Steem Engine and transfer them to DrugWars?</h2>
<p>Log in to Steem Engine platform. To find DWD, enter its name in the search area. You will see a similar line to the one you have in your wallet. It will look like this:</p>
<p><img src="/img/help/image53.png"/></p>
<p>The line will have the information about the total DWD tokens on Steem Engine. To buy some of them, click on the second icon, the one with two little arrows on it. This will open the market page. You could have come to this step by clicking on that same icon in your wallet, next to DWD tokens. On that market page, below the Market Depth graph of DWD, you will see the following:</p>
<p><img src="/img/help/image52.png"/></p>
<p>This is the place where you can either SELL your tokens for steem or BUY them. We will cover the BUY part in this tutorial but the SELL part is very similar except the obvious difference that you are selling and not buying. To BUY tokens, keep in mind that you are buying them with STEEMP so make sure you have STEEMP in your Steem Engine account. STEEMP is pegged to the value of STEEM and to have STEEMP you need to deposit STEEM into Steem Engine. You can learn how to do that by reading the FAQ on the Steem Engine platform. (In short: click on your user name in the upper right corner - click on conversion history - click on deposit)</p>
<p><img src="/img/help/image13.png"/></p>
<p>In the example above, a person wants to buy 2 DWD tokens. She needs to enter numbers in the first and second blank area. Given the information underneath, about the lowest ask of 0.079, she entered 0.08 for the price of the token and she entered 2 for the number of tokens she will buy. The total comes to 0.16 Steem and is calculated automatically by the platform. The balance this person has is listed below and since the total in this purchase is lower than the balance, the purchase will be able to go through. Keep in mind that these numbers here are for this example ONLY and may not be the same based on how the market value of the token changes. When you are at this stage of the process, click on the brown BUY DWD button to go to the next step which is the confirmation screen that will look like this:</p>
<p><img src="/img/help/image55.png"/></p>
<p>Review what you have done and if you are satisfied click on the BUY button. This will initiate a process where you will see the code of the transaction. Just click on the green CONTINUE button. You will have to login with steem connect:</p>
<p><img src="/img/help/image79.png"/></p>
<p>After you enter your information and click on GET STARTED you will have to allow the transaction so click on the green APPROVE button. This will get you the number of your transaction. At the same time the window for steem connect has opened, another one, in blue colour has opened too. It is normal to have those two opened at the same time at this part of the process. When you are done with the steem connect and get the information about your code, you can close it. You will continue this process with the other window that has opened and which will look like this:</p>
<p><img src="/img/help/image83.png"/></p>
<p>CLICK on TRANSACTION SENT just like the explanation in that window is telling you to. This is it, you have successfully purchased DWD tokens on Steem Engine and they will be visible in your Steem Engine wallet shortly.</p>
<p>To send your tokens from Steem Engine to your DrugWars account, you first need to have them on Steem Engine. This can be done by buying them (as we have just described), getting them from other users or by having them after you have withdrawn them from the game. Maybe you have changed your mind and want them back, it really does not matter. As long as you have DWD tokens on Steem Engine, you can transfer them to the game. Remember that line, with the info about the token, in your Steem Engine wallet? The one that looks like this:</p>
<p><img src="/img/help/image32.png"/></p>
<p>There are icons at the end of the line. Click on the second one from the right, the one that looks like a little arrow is coming out of the box. It will open the following:</p>
<p><img src="/img/help/image103.png"/></p>
<p>The TRANSFER window is pretty simple. Enter the amount you want to send to your account and where it says "TO", YOU MUST TYPE IN DrugWars just as it is typed in the example above. You do not have to put in the @ sign, it is already there, just type &ldquo;drugwars&rdquo; as seen in the above image. Tokens will arrive at your account in the DrugWars game. If you are sending to Server 1 Detroit, the memo can remain blank. If you are sending to Server 2 LA, enter &ldquo;s2&rdquo; in the Memo field. If you do not enter s2, it will go to server 1 by default. Click on the brown SEND DWD button and the transfer process will begin. It will be very similar to the one where you are buying tokens because you will get the screen with the code where you need to click on continue:</p>
<p><img src="/img/help/image118.png"/></p>
<p>You will need to log in with your steem connect information, click on "Get started", and approve the transaction in the next step:</p>
<p><img src="/img/help/image107.png"/></p>
<p>After you have logged in with steem connect and approved your transaction, that blue screen will still be waiting for you, the same one that you get when you are buying tokens and looks like this:</p>
<p><img src="/img/help/image83.png"/></p>
<p>Click on TRANSACTION SENT. Those two screens, the blue one and the steem connect one, open at the same time, do not be alarmed by this. Simply focus on steem connect and once you are done and have closed it, finish with the blue screen. This is it! You have successfully transferred tokens from Steem Engine to your DrugWars account and you will be able to see them in the game shortly after you have completed this process.</p>
<h2>7.15 How can I withdraw my DWD tokens from the game to Steem Engine?</h2>
<p>To withdraw your DWD tokens from DrugWars game to Steem Engine, you first need to click on the MARKET link in the left menu of DrugWars. It will open the "Market" part of the platform in the main screen. You will see the SHOP link opened automatically. To be able to withdraw your tokens, click on the EXCHANGE link which is located next to SHOP.</p>
<p><img src="/img/help/image12.jpg"/></p>
<p>You will see the information about how many tokens you have in the game. You can withdraw up to the amount you have, from 1 as the minimum to your amount as the maximum. Simply enter the number in the field and click on WITHDRAW. Your entered number must be an integer. You can not withdraw decimal amounts. When you have clicked on the green withdraw button, a small message of confirmation will appear in the bottom left corner:</p>
<p><img src="/img/help/image102.png"/></p>
<p>All you need to do now is go to your Steem Engine account and click on WALLET in the menu at the top of the page. There you will see all of your tokens including DWD. Keep in mind that you will sometimes need to wait a short period of time for tokens to arrive. You will see a line in your wallet with the information about how much tokens you have and what their price is.</p>
<p><img src="/img/help/image32.png"/></p>
<p>In the example above, there are 115 tokens in the wallet and those 115 are worth $0.73 with the percentage telling you how much the price has gone up, if green, or gone down, if the percentage will be in red. There are 4 little icons at the end of that line. If you move your mouse over them, you will see how they are links to information, market, send tokens, and token history. Now that you have your tokens on Steem Engine, you can sell them or send them to others. THAT IS IT! You have successfully withdrawn your tokens from the game to Steem Engine.</p>
<h2>7.16. Why does the price of DWD tokens keep changing?</h2>
<p>As with any other token, the market determines its price. You can see that all tokens on Steem Engine change their price not only from one day to another but from one hour to another depending on the demand.</p>
<div>
<p>[a]new image needed</p>
</div>
<p>This document has been composed with the online HTML editor. Use the online visual HTML beautifier&nbsp;will help you a lot while you are working on your articles.</p>
            </div>
        </div>
    </div>
</template>

<script>
import faq from '@/../faq.json';

export default {
  data() {
    return {
      q: '',
    };
  },
  computed: {
    faq() {
      return faq.filter(q =>
        JSON.stringify(q)
          .toLowerCase()
          .includes(this.q.toLowerCase()),
      );
    },
  },
};
</script>

<style scoped class="less">
.help {
  font-size: 18px;
}

img{
  max-width: 100%;
}
</style>
