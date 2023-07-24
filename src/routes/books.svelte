<script context="module">
    export async function load({ fetch }) {
  
      const res = await fetch('/230704BookData.json');
      const data = await res.json();
  
      return {
        props: {
          books: data.slice(1)  // skip the first item which are column titles
        }
      };
    }
  </script>
  
  <script>
    export let books;

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    }
  </script>
  
  <div class=" max-w-[75ch] container mx-auto px-4">
    <h1 class="text-4xl font-bold text-center my-8">Books List</h1>
    <div class="grid grid-cols-1 gap-6">
      {#each books as book (book.isbn)}
        <div class="flex flex-col bg-transparent rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-600 justify-between">
          <div class="flex justify-between px-6 py-4">
            <span class="text-sm text-zinc-600 dark:text-zinc-300">{book.date_finished ? formatDate(book.date_finished) : ""}</span>
            <span class="text-zinc-600 text-base dark:text-zinc-200">{book.score}/10</span>
          </div>
          <hr class="border-zinc-200 dark:border-zinc-600">
          <div class="px-6 py-4">
            <h2 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100 -mb-1">{book.title}</h2>
            {#if book.subtitle}
              <h3 class="text-base text-zinc-600 dark:text-zinc-300 pb-2">{book.subtitle}</h3>
            {/if}
            <span class="">{book.author}</span>
          </div>
          <div class="px-6 py-4 text-sm text-zinc-700 dark:text-zinc-100 space-y-2">
            <p>{book.notes}</p>
          </div>
          <div class="px-6 py-4 flex items-center justify-end"> <!--Should always be at the bottom of its parent div, regardless of the rest of the content-->
            <span class="items-center inline-flex py-[0.05rem] px-2 rounded-full text-xs font-medium bg-zinc-200 dark:bg-zinc-700">
              {#if book.isbn}
                  {book.isbn}
              {:else}
                  No ISBN
              {/if}
              </span>
          </div>
        </div>
      {/each}
    </div>
  </div>
  