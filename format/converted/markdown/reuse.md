# DAU Reuse Guide


Characters:
- Welcome
- Starting off - Cleanup
- Starting off - Creating the document
- Writing DAU documents - Chapters
- Writing DAU documents - Dialogue
- Writing DAU documents - Extra text formatting
- Parsing DAU documents

## Welcome
So, you've decided to use DAU for your next story, huh? Well, go ahead.

It's really simple to set up and compile DAU. You can make your own parser, but a parser + converter is included for you to use.

By the way, as of right now, this parser can only compile to DAUDJSON (DAU Descriptive JSON) and Markdown.

## Starting off - Cleanup
First, you need to cleanup the place.

Simply remove the `format` folder and its contents.

Then, recreate the `format` folder, and add a `source` folder within.

This is the easiest way to clean up the DAU working environment.

You can put your `.dau` files inside of `format/source`.

## Starting off - Creating the document
Now, you have to create the document.

Go to `format/source`, and create a new file with the `.dau` extension.

```

format/

|- source/

|- |- NewDAUFileYay.dau

```

You're done! Now, open the `.dau` file in your usual text editor.

## Writing DAU documents - Chapters
DAU syntax is kinda easy to grasp.

Each file has a set of **"chapters"**, with their own titles, locations, and even times.

```

? A chapter!

- jd :: Jane Doe

```

First, a `?` for telling DAU that you want to make a new chapter.

Then, you put your chapter title there. For example, `A chapter!`.

And, if that's all you want, then you're done!

But, there are options! You can add a location, or a date and time.

If you'd like one of these, add the General Information separator, `::`.

Also, add an `@` after your location if you want time.

Make sure to space between.

```

? A chapter! :: A location! @ A time!

- jd :: Jane Doe

```

But, if you'd want to *only* add a time, you can skip out completely on the location text and just have the formatting `:: @ A time!`

```

? A chapter! :: @ A time!

- jd :: Jane Doe

```

OK, great! We have a chapter! Now, you may have noticed that there's a `-` operator down there, instead of a `?`.

That's a **character defintion**. You can also use it to define chapter headers, like in this document, but we'll keep it simple.

OK, so basically, a character definition goes like this.

```

- jn :: John Doe

- jd :: Jane Doe

- bts :: Brent The Stickfigure

```

First, a dash, for telling DAU that you want to make a new character. `-`

Then, a special ID you can use to quickly refer to the character later on. `bts`

After that, add the General Information separator, `::`

And finally, the name, `Brent The Stickfigure`.

Also, names are technically separated by spaces. They get connected together when compiled, but this could possibly be used in the future to make the creation of DAU documents even easier.

## Writing DAU documents - Dialogue
DIALOGUE??? IN MY STORY??? Pah.

OK, but seriously, dialogue.

You kinda need dialogue, otherwise making chapters is pointless.

First, press **Tab**, to make a tabular space.

Then, type the ID of the character - `bts`

```

  bts

```

After that, start a new line and add **two** **Tab** presses.

Then, type in your dialogue!

```

  bts

    YO SUP I'M BRENT THE STICK MAN!!!

```

You can also add multiple lines of dialogue, just make sure to have two tabular spaces before each line.

```

  bts

    YO SUP I'M BRENT THE STICK MAN!!!

    MY FAVOURITE FOODS ARE GREEN AND YELLOW!!!

```

Then, continue for multiple characters.

```

  bts

    YO SUP I'M BRENT THE STICK MAN!!!

    MY FAVOURITE FOODS ARE GREEN AND YELLOW!!!

  jd

    Brent, please leave. You are interrupting the peace.

  bts

    NO!!!!!!!!!!!!!!!!!!!!!!!!!!

```

Completed file:

```

? A chapter! :: @ A time!

- jn :: John Doe

- jd :: Jane Doe

- bts :: Brent The Stickfigure

  bts

    YO SUP I'M BRENT THE STICK MAN!!!

    MY FAVOURITE FOODS ARE GREEN AND YELLOW!!!

  jd

    Brent, please leave. You are interrupting the peace.

  bts

    NO!!!!!!!!!!!!!!!!!!!!!!!!!!

```

## Writing DAU documents - Extra text formatting
Hey, by the way, if you'd like to make your documents fancy, you can add **"extra text formatting"**.

-- Invisible formatting

**Bold** - `:[text]:`

  Makes your text visibly bolder.

  Use this for emphasis, maybe?

*Italic* - `:/text/:`

  Makes your text italicized.

  Use this for emphasis, too.

`Code block` - `:'text':`

  Makes your text monospace, if it isn't already.

  Use this for contextual stuff, or actual code.

-- Visible formatting

Escaped formatting operator - `\:`

  Prints a single colon. You don't have to use this to write a colon, but only to negate formatting with the operator.

  The `\` should be placed directly before the colon, always!

Dialouge - **"text"**

  Tells DAU that this piece of text is spoken.

Recieved message - **<< "text"**

  Tells DAU that this piece of text has been recieved by the protagonist within the context of the story, by any means.

Sent message - **"text" >>**

  Tells DAU that this piece of text has been sent by the protagonist within the context of the story, by any means.

## Parsing DAU documents
Great! Now, you need to parse the DAU file.

The Dizzy-Rewrite repository comes with a built-in DAU parser for your needs.

Go to the **root** of the repository folder, and open a terminal.

Current formats you can export to with the built-in parser:

- Markdown

- Plaintext

...sorry for the lack of output languages. More coming soon!

Type `node code/filer.js [FILENAME WITHOUT DAU EXTENSION] [OUTPUT LANGUAGE]`

```

[BRENT@STICKMAN-COMPUTER MY-STORY]$ node code/filer.js NewDAUFileYay Markdown

```

This should create a new folder, and add contents.

```

format/

|- converted/

|- |- markdown/

|- |- |- NewDAUFileYay/

|- |- |- |- A_Chapter_.md

|- |- |- NewDAUFileYay.md

|- source/

|- |- NewDAUFileYay.dau

```

Inside `format/converted/[OUTPUT LANGUAGE]` will be your output file.

