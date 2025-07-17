document.addEventListener('DOMContentLoaded', () => {

  const postForm = document.getElementById('postForm');
  const postsContainer = document.getElementById('postsContainer');
  const successMessage = document.getElementById('successMessage');
  const clearBtn = document.getElementById('clearBtn');
  const imagemInput = document.getElementById('imagem');

  const criarEInserirPost = (dadosTexto, urlImagem) => {
      const novoPost = document.createElement('article');
      novoPost.classList.add('post');
      dadosTexto.categorias.forEach(categoria => {
          novoPost.classList.add(`category-${categoria}`);
      });

      let postHTML = `
          <h2>${dadosTexto.titulo}</h2>
          <div class="post-meta">
              Postado em: ${dadosTexto.data} | Por: ${dadosTexto.nome} | Categoria: ${dadosTexto.categoriaTexto}
          </div>
      `;

      if (urlImagem) {
          postHTML += `<img src="${urlImagem}" alt="Imagem do post" class="post-image">`;
      }

      postHTML += `<p>${dadosTexto.conteudo.replace(/\n/g, '<br>')}</p>`;

      novoPost.innerHTML = postHTML;
      postsContainer.prepend(novoPost);

      postForm.reset();
      successMessage.style.display = 'block';
      setTimeout(() => {
          successMessage.style.display = 'none';
      }, 5000);
  };

  const handlePostSubmit = (event) => {
      event.preventDefault();


      const titulo = document.getElementById('titulo').value;
      const nome = document.getElementById('nome').value;
      const conteudo = document.getElementById('conteudo').value;
      
      const categoriasSelecionadas = [];
      document.querySelectorAll('input[name="categorias"]:checked').forEach(checkbox => {
          categoriasSelecionadas.push(checkbox.value);
      });
      const categoriaTexto = categoriasSelecionadas.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ') || 'Sem Categoria';

      const hoje = new Date();
      const dataFormatada = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

      const dadosTexto = {
          titulo,
          nome,
          conteudo,
          categorias: categoriasSelecionadas,
          categoriaTexto,
          data: dataFormatada
      };

      const arquivoDeImagem = imagemInput.files[0];

      if (arquivoDeImagem) {
          const reader = new FileReader();
          
          reader.onload = (e) => {
              const urlImagem = e.target.result; 
              criarEInserirPost(dadosTexto, urlImagem);
          };
          reader.readAsDataURL(arquivoDeImagem);
      } else {
          criarEInserirPost(dadosTexto, null);
      }
  };

  postForm.addEventListener('submit', handlePostSubmit);

  clearBtn.addEventListener('click', () => {
      postForm.reset();
  });
});