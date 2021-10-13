import React, {useState} from 'react'
import styles from './_addbutton.module.sass'
import {ArrowUp, Plus, File, Check, Calendar} from 'react-feather'

const AddButton = ({name, journalData, setJournalData, currentBook, currentSection, setCurrentBook, setCurrentSlot, colors, icons, currentDate}) => {
    
    const [journalTabOpen, setJournalTabOpen] = useState(false)
  
    let date = new Date()

    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    const slot = {
        id: date.valueOf(),
        title: '',
        date: formatAMPM(date),
        subsections: [
            {
                name: 'brain dump',
                color: '#7ED956',
                id: 0,
                data: [],
                prompts: [
                  'What have you been worried about?',
                  `What do you keep forgetting to do?`,
                  `What would make you really happy?`,
                  `Did something go wrong with your day/week?`,
                  `What really worked today/ this week?`,
                  `What tasks never seem to get done?`,
                  `Was there something you didn't get time to do?`,
                  `Is there an upcoming event or special occasion?`,
                  `Are there maintenance tasks you keep meaning to do around the home, for the car or other areas?`,
                  `Is there someone you keep meaning to contact? Or an act of kindness you would love to do for someone special.`,
                  `Are there any big goals you keep putting off that would make a big difference to your life.`,
                  `Is there something you would love to learn?`,
                  `Maybe there's part of your routine that really isn't working?`,
                  `Is there part of your home that needs rearranging or redecorating?`,
                  `Do you need to plan a vacation, party or other exciting events?`,
                  `Is someone or something annoying you?`,
                  `What are your biggest goals for the month?`,
                  `Can you think of a stressful task in your life that you're avoiding?`,
                  `What will truly make you happy?`,
                  `Is there someone you need to get back to?`,
                  `Where do you want to go on your next vacation?`,
                  `How are you generally feeling at the moment?`,
                  `Where do you want to be a year from now?`,
                  `Do you have any regrets? If so, how can you move forward?`,
                  `What hobbies are you most interested in and why?`,
                  `Do you have any work projects you want to start?`,
                  `Did you go through a recent life change? How did it affect you?`,
                  `Are there any projects you need to get done at home?`,
                  `What do you need to let go of?`,
                  `Are you spending enough time offline? How can you can create more of a balance?`,
                  `How are you feeling?`,
                  `Is there a new habit you'd like to develop?`,
                  `Do you have any goals you want to reach?`,
                  `What do you have coming up in your life?`,
                  `What do you need to get done for yourself?`,
                  `What is something that recently upset you or made you angry?`,
                  `What's something that's currently stressing you out?`,
                  `What is something you'd like to say to someone but feel like you can't?`,
                  `What's something you wish you could get off your chest?`,
                  `What's something you know about that you wish you didn't know?`,
                  ``
                ]
            },
            {
                name: 'gratitude',
                color: '#FFC107',
                id: 1,
                data: [],
                prompts: [
                  `What's a simple pleasure that you're grateful for?`,
                  `What's something that you're grateful to have today that you didn't have a year ago?`,
                  `Write about someplace you've been that you're grateful for.`,
                  `What's something about your body or health that you're grateful for?`,
                  `Open the door or window and look outside. What's something you're grateful for outside?`,
                  `What's an accomplishment you're proud of?`,
                  `What's a possession that makes your life easier?`,
                  `Open your phone or photo album and find a photo that you like. Why are you grateful for this photo? What are you grateful for in the photo?`,
                  `What have you been given that you're grateful for?`,
                  `What's something or someone that makes you feel safe?`,
                  `Write about a friend that you're grateful for.`,
                  `Write about a teacher or mentor that you're grateful for.`,
                  `Write about a family member that you're grateful for.`,
                  `What did you accomplish today?`,
                  `What's one of your personality traits that you're grateful for?`,
                  `What mistake or failure are you grateful for?`,
                  `What skill(s) do you have that you're grateful for?`,
                  `What's something that you made recently that you're grateful for?`,
                  `Look around the room and write about everything you see that you're grateful for.`,
                  `Write down one good thing that happened to you today.`,
                  `What about your upbringing are you most grateful for?`,
                  `Name 5 things you are doing well currently.`,
                  `Who or what in your life are you happy to have let go?`,
                  `Think about the worst period you went through your life and list 10 ways life is better now than it was then.`,
                  `List something good that has recently caught your attention to make you realize how fortunate you are.`,
                  `Think about the qualities of the people you admire. List these qualities and how you can incorporate them in your life.`,
                  `List 3 people and/or things you feel that you take for granted. How can you express more appreciation for these things or people?`,
                  `What friends are you most grateful for having? List what makes each friend special.`,
                  `Name 3 things that always put a smile on your face.`,
                  `What is the most beautiful place you have been to? Relive being in this place now and write about your experience.`,
                  `What has been the highlight of your day today?`,
                  `What things do you own that make life easier?`,
                  `Name 3 things that have happened to you that have strengthened your character and who you are today (positive or negative events).`,
                  `List 2 struggles you experienced in life that you have overcome. What or who have helped you to overcome these trials?`,
                  `List 5 things you love about your home.`,
                  `What is something from each of your senses you are grateful for today? (Sight, smell, taste, touch, sound)`,
                  `What challenge did you overcome that you now see the benefit in?`,
                  `What book are you grateful for and why? What are the teachings?`,
                  `What are you grateful for about your town? Your time period? Your country?`,
                  `Name three everyday objects that you are grateful for.`,
                  `What music are you most grateful for?`,
                  `Name three people you are grateful for outside of your immediate family. Why?`,
                  `What do you love most about each season of the year?`,
                  `What discovery have you made in the last year that you are grateful for?`,
                  `What do you love most about life?`,
                  `What was a wonderful thing that happened today?`,
                  `What is something you take for granted?`,
                  `What do you love about yourself?`,
                  `What is your favorite time of day and why do you love it?`,
                  `What is something amazing that happened to you in the last week, month, or year?`,
                  `Describe a hobby that brings you joy. Why?`,
                  `Describe something you cherish in the room with you.`,
                  `Name one thing that made you smile or laugh today.`,
                  `What is something beautiful you saw today?`,
                  `List 30 things that make you smile.`,
                  `Describe your favorite time of year: the scents, the weather, the activities ...`,
                  `Write out 10 positive affirmations`,
                  ``
                ]
            },
            {
                name: 'reflection',
                color: '#F50057',
                id: 2,
                data: [],
                prompts: [
                  'What good did I do today?',
                  `How did I feel today? (Energy, emotions, thoughts?)`,
                  `What did I learn today?`,
                  `What new decisions have I made and what do I expect to happen.`,
                  `What were my character flaws? How did I treat others?`,
                  `What's an accomplishment you're proud of?`,
                  `Am I severely neglecting one area of my life that's infecting others?`,
                  `What are the most important things to focus my energy on tomorrow?`,
                  `What will my ultimate life be like?`,
                  `Where am I now? Health? Financially? Socially/romantically?`,
                  `What are my top 5 priorities at this point?`,
                  `What were your biggest challenges from the year? What did you learn from them?`,
                  `What were your biggest wins from the year? What did you accomplish? What are you proud of yourself for?`,
                  `What helped you to get through this year? (e.g. routines, boundaries, relationships, resources)`,
                  `What were your favorite books, movies, shows, and songs from the past year?`,
                  `How would you describe the version of yourself from the past year? How have you changed since last year? In what ways have you grown this year?`,
                  `What kind of person do you want to become next year? How do you want to grow? How can you treat yourself with love, respect, and patience?`,
                  `How well did you take care of yourself this year? Did you prioritize exercise, sleep, and nutrition?`,
                  `How will you commit to taking even better care of yourself next year?`,
                  `What kind of boundaries did you set for yourself and others this year? How did you uphold those boundaries? Where did you let them slide?`,
                  `What do you want your boundaries to look like for next year? How will you prioritize them?`,
                  `What did your typical daily routine look like this year? How did you start and end your days? `,
                  `What do you want your routine to look like for next year? What would be your ideal morning and evening routines?`,
                  `What were your top three priorities this past year? (e.g. work, family, finances, self-care, mental health, etc)`,
                  `What are your top three priorities for next year? Why are they important to you?`,
                  `How satisfied were you with your work this year? What did you enjoy and not enjoy?`,
                  `What changes could you make next year will help you feel fulfilled with your work?`,
                  `What role did your environment play in your life this year? (Think of your living space, community, workspace, nature, etc)`,
                  `Do you want to make any changes to your environment next year? What would your ideal environment look and feel like?`,
                  `What emotions did you experience this past year? Did you allow yourself to feel or talk about them freely?`,
                  `What feelings do you want to embrace for next year? What intentions do you want to set?`,
                  `What was your mindset like this year? Did you overthink or overanalyze anything in particular?`,
                  `How can you improve your mindset in the next year? How will you commit to keeping a healthy mindset?`,
                  `Who did you connect with this year? Who made you feel the most supported?`,
                  `Who do you want to connect with next year? What kind of people do you want to surround yourself with?`,
                  `How did you relax and unwind this year? What were your favorite memories? Did you start any new hobbies or nurture old ones?`,
                  `What do you want to explore more of next year? What does fun look like to you?`,
                  `What goals did you set for yourself at the beginning of the year? Did you achieve them? (Note: Remember to give yourself grace if you didn't achieve your goals)`,
                  `What are your goals for next year? What do you want to learn or get better at?`,
                  `What would you tell your 16-year-old self?`,
                  `What would you like to tell your future self?`,
                  `Do you have any regrets?`,
                  `How have you learned from your biggest mistakes?`,
                  `What do you love most about life?`,
                  `What advice would you give to your children and grandchildren?`,
                  `What matters most in life?`,
                  `What would your childhood self think of your life thus far?`,
                  `How did your experience of adulthood differ from your expectations?`,
                  `What is the best advice you ever received?`,
                  `What do you think your body would say if it could talk?`,
                  `What scares you?`,
                  `What places have you most enjoyed visiting?`,
                  `What is your favorite book/movie/song? Why?`,
                  `What are your pet peeves?`,
                  `Do you like your name? Has it ever changed? What is your favorite name?`,
                  `Describe your day from another person’s perspective. Is it different from yours?`,
                  `Who helped you the most today? Who did you help the most?`,
                  `Reflect on how your body feels. Where are you storing your stress? What put it there?`,
                  `Did you stop yourself from doing something you enjoy today? Why or why not?`,
                  `Did something (or someone) empower you today?`,
                  `If you’d had another hour during the day, how would you have spent it?`,
                  `Describe the moments of frustration you felt today. How would your day have changed if those moments were different?`,
                  `Who do you wish you had talked to today? How do they improve your life?`,
                  `What frightened you today?`,
                  `How were your meals today? Do you feel nourished?`,
                  `Would you change any of the decisions you made today?`,
                  `Describe something you learned today that you didn’t know before.`,
                  `What was the most peaceful moment during the day?`,
                  `Write about turning points in your life – what would be different now if you had made a different choice.`,
                  `Write about regrets you may have.`,
                  `What are 10 things you are really good at?`,
                  `What are 5 physical features you love about yourself`,
                  `What are 3 of your strongest qualities?`,
                  `What are 5 of your best personality traits`,
                  `What are 10 things that make you the happiest?`,
                  `What bad habits and mindsets do you need to quit?`,
                  `Write out 15 compliments you can give yourself`,
                  `What are 5 things you have done that make you proud?`,
                  ``
                ]
            },
            {
                name: 'aspiration',
                color: '#03A9F4',
                id: 3,
                data: [],
                prompts: [
                  `Imagine yourself in ten years. If everything goes well, what would you be doing? Who would you be with?`,
                  `If you could do one thing better, what would it be? How would it make your life better if you could do that?`,
                  `Have you ever encountered a key decision—a fork in the road—that set you in a new direction in some area of life? What happened? How did you make that decision?`,
                  `What have been major roadblocks that made it hard for you to become the best you could be? How have you coped with or overcome these obstacles?`,
                  `What is something you hope to be good at in five years? What is one thing you do now to help work toward being good at this?`,
                  `If you could study just one thing for three months, what would you study? Why?`,
                  `If you could do one thing to make the world a better place, what would you want to do? What steps could you take to make that kind of difference?`,
                  `Suppose someone asks you this question ten years from now: What have you most enjoyed doing over the past ten years? What do you hope you could tell them? What can you do now that will make it more possible that you'll be able to give that answer?`,
                  `Imagine that you're hanging out with some friends ten years from now. Who do you hope will be there? Where do you hope you will be? What would you be talking about?`,
                  `What really motivates you to work toward your dreams? What keeps you going?`,
                  `What obstacles or challenges do you see between you and your hopes for the future? What are things you can do now to make it more likely that you'll overcome those challenges?`,
                  `Describe a perfect day in your dream life`,
                  `Name 5 ways you intend to get out of your comfort zone.`,
                  `Name one new item you would like to include in your morning routine.`,
                  `Name one fun activity you plan to do everyday.`,
                  `Name 3 activities you will do to challenge your mind.`,
                  `What 3 fun things would you like to do with your friends this year?`,
                  `What are the 3 quotes that motivate you to achieve more in your life.`,
                  `If you could travel to any city of the world, where would you go and why?`,
                  `Name the book that had the greatest impact on your life.`,
                  `Name 5 goals you would like to accomplish by the end of this year`,
                  `Where would you like to retire? What does retirement look like for you?`,
                  `In five years, where would you like to live? What would you like to be doing?`,
                  `What is one personality trait that you wish you had? What steps can you take to embrace that characteristic?`,
                  `What is the biggest event coming up in the next few months? How can you make it truly special?`,
                  `If you could travel anywhere in the world for any length of time, where would it be? What would you see there?`,
                  `What are your top 5 interests? How can you incorporate these interests in your daily activities?`,
                  `Is there someone from high school or college that you want to get in touch with again? How can you reach out to them?`,
                  `What does success mean to you? How would you know that you've had a successful life?`,
                  `Where would you like to volunteer? How do you currently give back to your community?`,
                  `Do you have any fitness or goals? When is your deadline for accomplishing them?`,
                  `If you were in charge, what would you forbid immediately?`,
                  `What needs to change in your job for you to feel fulfilled?`,
                  `Write about a hobby that you’d like to pick up.`,
                  `How could you change your life to become a hero to someone else?`,
                  `Describe your ideal weekend. What would it include? What wouldn’t it include?`,
                  `Rewrite a conversation you’ve had in the way you wish it had gone.`,
                  `Make a bucket list.`,
                  `Write about home improvements you would like to make.`,
                  `Write about places you wish to see, vacations you plan to have.`,
                  `Write about children you plan to have, and what you wish for them.`,
                  `Write down how you can improve your life.`,
                  `What line of work do you plan on pursuing in the future?`,
                  `Where do you want to be 5, 10, or 15 years from now?`,
                  `What would make you feel happy?`,
                  `What would make you feel fullfilled?`,
                  `What do you desire more than anything in this life`,
                  ``
                ]
            },
            {
                name: 'memory',
                color: '#7986CB',
                id: 4,
                data: [],
                prompts: [
                  `What's something you were afraid of as a child?`,
                  `What's something difficult you had to do?`,
                  `What's an embarrassing moment that happened to you?`,
                  `Who is someone you've lost? What are some of your memories about that person?`,
                  `What's something that helped to shape your outlook on life?`,
                  `Describe your teachers at school.`,
                  `Describe your best childhood friend and your relationship with this person.`,
                  `When you were a child, how did you imagine your adult self?`,
                  `Write about one of your earliest memory?`,
                  `What are some of the memories you associate with springtime? With summer, fall, and winter?`,
                  `Write about one of your days at school or college`,
                  `Write about one of your crushes`,
                  `Write about one of your dates`,
                  `Write about your job`,
                  `Write about your graduation`,
                  `Write about your wedding`,
                  `Describe what your relationship was like with your parents.`,
                  `Do you think you had a good childhood? Why?`,
                  `What was your relationship like with your siblings?`,
                  `What was your favourite game?`,
                  `What was your favourite toy?`,
                  `Who was your best friend at primary (elementary) school? Do you keep in touch? Why?`,
                  `Who was your best friend at secondary (high) school? Do you keep in touch? Why?`,
                  `What was your favourite class at school? Why?`,
                  `What was your worst class at school? Why?`,
                  `Did you have any bad habits? When did you grow out of these?`,
                  `Which sports did you play?`,
                  `Who was your favourite teacher? What is your best memory with them?`,
                  `What is your strongest primary school memory? Describe in as much detail as possible.`,
                  `What is your strongest secondary school memory? Describe in as much detail as possible.`,
                  `Can you think of any childhood memories you would like to remember better?`,
                  `Who did you not get on well with in your class?`,
                  `Who was the most popular person in your class?`,
                  `What was the worst accident you ever had? Who was there?`,
                  `What would you say to a 8 year old version of yourself?`,
                  `What would you say to a 14 year old version of yourself?`,
                  `What would you say to a 16 year old version of yourself?`,
                  `What would you say to a 18 year old version of yourself?`,
                  `What was your favourite sweets or chocolate?`,
                  `What was your favourite holiday? Who was there? Did you make any holiday friends?`,
                  `What was your favourite cartoon?`,
                  `Did you do any after school activities? Which one did you enjoy the most?`,
                  `How did you spend your weekends?`,
                  `How did you get to school?`,
                  `What was your morning routine?`,
                  `Who was your role model? Why?`,
                  `How would you describe your personality as a child? Whilst parts of your personality do you think are the same today? Which parts do you think are different?`,
                  `What was your house like? Can you remember each room?`,
                  `When was the first time you kissed someone?`,
                  `Did you have any family traditions?`,
                  `Describe your first date. How did you feel?`,
                  `What were you scared of as a child? Are you still scared of it today?`,
                  `Did you have any recurring dreams or nightmares?`,
                  `What was your favourite school trip?`,
                  `What was the best gift you ever received?`,
                  `What was your favourite childhood birthday party? Why?`,
                  `How do you think your childhood experiences helped shape your behaviour today?`,
                  `What was your most precious childhood possession?`,
                  `What things did you create when you were a child?`,
                  `What places do you remember fondly from childhood?`,
                  `What personal achievements make you proud?`,
                  `Write about what you appreciate most about your childhood.`,
                  `Write about your childhood love life.`,
                  `Describe the most unusual or memorable place you lived.`,
                  `Write about the five happiest times in your childhood.`,
                  `What period of your life do you look back upon most fondly?`,
                  `Who have been the most important people in your life?`,
                  `Describe a time when someone was unexpectedly kind to you.`,
                  `Describe a random act of kindness you did for someone else.`,
                  `Finish this thought: Nobody knows that I ...`,
                  `What is the biggest lie you have ever told?`,
                  `Have you ever done something that you thought you couldn't?`,
                  `What have you done for love?`,
                  `Find an old photograph of yourself. Write about the memories it inspires.`,
                  `When in your life did you feel most proud?`,
                  `Of all the places you have lived, which most felt like home?`,
                  `What was your best age so far?`,
                  `Do you have a memory that should be happy, but instead makes you sad? What about the other way around?`,
                  `When is a time in your life that you felt successful?`,
                  `Think about your best friend in childhood. What did you like to do together?`,
                  `Write about a trip you took where something (or everything!) didn’t go according to plan.`,
                  `When in your life have you felt brave?`,
                  `What book made you fall in love with reading?`,
                  `How old were you when you first felt like an adult?`,
                  `If you could relive any day of your life and change nothing, what day would you choose?`,
                  `What was something you desperately wanted as a child? What do you desperately want now?`,
                  ``
                ]
            },
            {
                name: 'forgive',
                color: '#673AB7',
                id: 5,
                data: [],
                prompts: [
                  `What does forgiveness mean to you?`,
                  `How forgiving a person do you think you are on a scale of 1-100? Why?`,
                  `How forgiving would you like to be?`,
                  `What are the benefits of forgiveness?`,
                  `What are the disadvantages of forgiveness?`,
                  `What are some ways you can be more forgiving?`,
                  `Do you think you are more forgiving towards yourself or others? Why?`,
                  `Do you believe in forgive and forget or forgive and remember? (or neither…)`,
                  `Do you find it easy to ask for forgiveness?`,
                  `What is something you wish someone would forgive you for?`,
                  `Do you need someone to say sorry to be able to forgive them? Why?`,
                  `Who is the most forgiving person you know?`,
                  `Do you think people who can forgive are happier?`,
                  `When is the last time someone forgave you?`,
                  `What is something you need to forgive yourself for?`,
                  `What is something that happened in your life that you find really hard to forgive?`,
                  `What would the world be like with more forgiveness?`,
                  `Who do you need to forgive?`,
                  `Why is it important to be understanding of differences in order to forgive?`,
                  `Do you think you can make a forgiveness resolution?`,
                  `Why is forgiving hard?`,
                  `How can others benefit from receiving your forgiveness?`,
                  `How do you accept apologies?`,
                  `What can make forgiveness easier?`,
                  `How can you encourage others to forgive?`,
                  `How do you know when you've truly forgiven someone?`,
                  `Why is it bad to hold onto grudges?`,
                  `How does forgiveness make you stronger?`,
                  `How does it feel to be forgiven?`,
                  `Does forgiveness have an impact on the world?`,
                  `Why do some people ignore the power of forgiveness?`,
                  `Who is a good example of a forgiving person?`,
                  `How do you let people know when you've forgiven them?`,
                  `Is everyone capable of forgiveness?`,
                  `How can you practice forgiveness in your daily life?`,
                  `How do you feel when you apologize to someone?`,
                  `Are there some things that are unforgivable, or can you always find the love to forgive?`,
                  `How does it feel to hold onto things instead of forgiving the other person?`,
                  `Write a story that shows the negative effects of refusing to forgive.`,
                  `What does forgiveness look like?`,
                  `Who have you learned about forgiveness from?`,
                  `What is the difference between a sincere and an insincere apology?`,
                  `How can you teach forgiveness by example?`,
                  `What are some good ways to apologize sincerely?`,
                  `Are some people more difficult to forgive than others? Why is this?`,
                  `Is there anyone you need to ask for forgiveness?`,
                  `How do you show someone that you're sorry and deserve forgiveness?`,
                  `Am I a forgiving person?`,
                  `Why is it hard for me to forgive myself?`,
                  `Am I ready to let go of the version of myself who would do what I did?`,
                  `Have I tried to grow from the experience?`,
                  `What have I learned from the experience?`,
                  `What do I need to forgive myself for?`,
                  `Have I been punishing myself? If yes, why?`,
                  `Do I believe I need and deserve to forgive myself?`,
                  `How do you know when to let go?`,
                  `Discuss a time you chose not to forgive someone and why.`,
                  `Do you believe that forgiveness is necessary for healing childhood trauma? Discuss why or why not.`,
                  `Have you ever felt pressured to forgive someone? Discuss how you were pressured and how that made you feel.`,
                  `How have you set boundaries with someone who is pressuring you to forgive? Or, how would you set boundaries in this type of situation?`,
                  ``
                ]
            },
            {
                name: 'letter',
                color: '#393D46',
                id: 6,
                data: [],
                prompts: [
                    `Write a letter of forgiveness to someone.`,
                    `Write a letter to your anxious thoughts.`,
                    `Write a letter of thanks to one or both of your parents for the most recent thing they helped you with.`,
                    `Write a letter to a friend that includes one or two of your favorite memories together.`,
                    `Write a letter to "the world" in which you share your ideals for the future.`,
                    `Write a letter to your past self. Tell him or her things you wish you had known then.`,
                    `Write a letter to your future self. Share your hopes and dreams or things you'd like to remember with him or her.`,
                    `Write a letter to someone your age who lives in another country. Describe your life and find out how his or hers differs.`,
                    `Write a letter to an anonymous stranger. Tell him or her anything you'd like to share.`,
                    `Write an encouraging letter to yourself to read when you are feeling sad.`,
                    `Write a letter to someone you admire and tell the person what you appreciate about him or her.`,
                    `Write a letter to someone that you'd like to get to know better and introduce yourself.`,
                    `Write a letter to your favorite character from a book, movie, or TV show. Ask him or her all your questions or share your favorite parts of his or her story.`,
                    `Write a letter from someone else to you. What do you need to hear from them?`,
                    `Write a breakup letter to a bad habit.`,
                    `Think about your first crush or love. Write them the letter you wish you'd sent.`,
                    `Write a letter to someone you've lost.`,
                    `Write letters to your future children and grandchildren that you can give to them when they are older.`,
                    `Write a love letter to your least favorite part of your body.`,
                    `Write yourself a love letter`,
                    `Write a positive advice letter to your future self.`,
                    `Write a letter of thanks to your mind and body for what it does for you.`,
                    `Write a letter of apology to yourself for a time that you treated yourself poorly, or allowed someone else to do so.`,
                    `Who is someone important to you? Write them a letter telling them what they mean to you.`,
                    ``
                ]
            },
            {
                name: 'note',
                color: '#CFD8DC',
                id: 7,
                data: [],
                prompts: []
            }
        ]
    }
    
    const addSlotSection = () => {

        if(journalData.length > 0){
            journalData.forEach((props)=>{
                if(currentBook === props.id){
                    props.dates.forEach((date)=>{
                        if(date.date.toDateString() === currentDate.toDateString()) {
                            date.sections.forEach((props2)=>{
                        
                                if(currentSection === props2.name){
            
                                        props2.slots.push(slot)
                                        setJournalData([...journalData])
                                        setCurrentSlot(slot.id)
            
            
                                }
            
                            })
                        }
                    })
    
                }
            })
        }
    }

    const [journalColor, setJournalColor] = useState(0)
    const [journalIcon, setJournalIcon] = useState(0)

    const addJournal = () => {
        let newJournal = {
                id: date.valueOf(),
                icon: icons[journalIcon],
                color: colors[journalColor],
                dates: [
                    {
                        date: new Date(),
                        sections: 
                                [
                                            {
                                                id: 0,
                                                icon: <File />,
                                                name: 'notes',
                                                slots: []
                                            },
                                            {
                                                id: 1,
                                                icon: <Check />,
                                                name: 'tasks',
                                                slots: []
                                            },
                                            {
                                                id: 2,
                                                icon: <Calendar />,
                                                name: 'events',
                                                slots: []
                                            }
                                ]
                    }
                ]
        }
        journalData.push(newJournal)
        setJournalData([...journalData])
        setJournalTabOpen(false)
        setCurrentBook(newJournal.id)
    }
    
    const JournalTab = () => {
        return (
            <ul>
                <li>
                    <p>Color</p>
                    <ol className={styles.colors}>
                        {colors.map((color, i)=><li className="colorButtons" onClick={()=>setJournalColor(i)} key={i} id={`color${i}`} style={{backgroundColor: color}}><div className={i===journalColor ? styles.activeButton : null} /></li>)}
                    </ol>
                </li> 
                <li>
                    <p>Icon</p>
                    <ol>
                        {icons.map((icon, i)=><li className="iconButtons" onClick={()=>setJournalIcon(i)} key={i} id={`icon${i}`}><div className={i===journalIcon ? styles.activeButton : null} />{icon}</li>)}
                    </ol>
                </li>   
            </ul>
        )
    }

    const openJournalTab = () => {
        setJournalTabOpen(true)
    }

    document.addEventListener('mouseup', function(e) {
        const addButton = document.getElementById('addButton');
        if(addButton){
            if (!addButton.contains(e.target)) {
                setJournalTabOpen(false)
            }
        }
    });
    
    const journalButtonIcon = journalTabOpen ? <Plus /> : <ArrowUp />

    const journalClick = journalTabOpen ? addJournal : openJournalTab

    const text = name==='journal' ? <div onClick={journalClick} className={styles.clickButton}><p>Add {name}</p>{journalButtonIcon}</div> : <div className={styles.clickButton} onClick={addSlotSection}><p>Add {name}</p><Plus /></div>

    return (
        <button className={styles.addButton} id="addButton" >
            {text}
            {journalTabOpen ? <JournalTab /> : null}
        </button>
    )
}

export default AddButton