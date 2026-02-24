1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

    1. Ans: Basically, getElementById and getElementsByClassName are for specific searches. But I like querySelector and querySelectorAll more because I can use any CSS selector like I do in my style sheet.

    About what they return:
        1. getElementById and querySelector only give me one single element.
        2. getElementsByClassName gives an HTMLCollection (which is live and updates itself).
        3. querySelectorAll gives a NodeList (which stays static).







2. How do you create and insert a new element into the DOM?

    2. Ans: To add a new element to the DOM, I first create it using document.createElement(), like making a 'div' or 'p' tag. After that, I set its content using .innerText and add any necessary styles or Tailwind classes with .classList.add(). Once the element is ready, I select the parent container where I want it to go and finally use .appendChild() to put it at the end or .prepend() if I want it at the top. I actually used this same logic in my project to show the job cards dynamically.







3. What is Event Bubbling? And how does it work?

    3. Ans: To me, Event Bubbling is like a bubble rising from the bottom of a pond. When I click on a specific element, like a button or a span, the event doesn't just stay there. It travels upward and triggers the same event on its parent, then the grandparent, and so on, until it reaches the very top of the DOM tree (like the body or document). For example, if I have a button inside a div and I click that button, the click event will fire for the button first, and then it will automatically move up to the div.






4. What is Event Delegation in JavaScript? Why is it useful?

    4. Ans: Event Delegation is a clever technique where instead of adding an event listener to every single child element, I just add one single listener to their parent element. This works because of 'Event Bubbling'—when a child is clicked, the event bubbles up to the parent, and the parent can handle it.
    It's really useful for a couple of reasons. First, it saves a lot of memory because I'm using only one listener instead of dozens. Second, it's perfect for dynamic elements. In my project, if I add a new job card to the list after the page has loaded, I don't need to manually add a new listener to it. The parent listener already knows how to handle it, which makes my code much cleaner and more efficient.






5. What is the difference between preventDefault() and stopPropagation() methods?

    5. Ans: The main difference is what they actually stop. I use preventDefault() when I want to stop the browser's default action. For example, if I click a link or submit a form, the page usually reloads, but calling this method stops that from happening. On the other hand, stopPropagation() is all about controlling the event flow. It stops the event from bubbling up to the parent elements. So, if I have a click event on a button and I use this method, the event won't trigger any click listeners on the containers above it.