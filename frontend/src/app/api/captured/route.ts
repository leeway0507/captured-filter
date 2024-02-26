export const dynamic = 'force-dynamic';

const register = async (request: Request) => {
  console.log(request);

  const req = await fetch('https://we-captured.kr/product/1');
  const newHtml = await req.text();
  const top = `<script>
  

  // Create a new div element
  var newDiv = document.createElement('div');
  
  // Optionally, you can set attributes, styles, or content for the new div
  newDiv.textContent = 'This is a new div';
  
  // Add a class to the new div
  newDiv.setAttribute('class', 'w-full aspect-[1/0.01] text-white text-center z-50');
  newDiv.setAttribute('style', 'background:red');
  
  // Add the new div to the elements variable
  // add the newly created element and its content into the DOM
  const parentDiv = document.getElementsByClassName("hidden tb:block")[0];
  console.log(parentDiv)
  const childDiv = document.getElementsByTagName("main")[0];
  console.log(childDiv)

  document.body.insertBefore(newDiv, childDiv);
  // document.body.appendChild(newDiv)
</script>`;

  const resultHtml = newHtml + top;
  return new Response(resultHtml, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
};

export { register as GET };
