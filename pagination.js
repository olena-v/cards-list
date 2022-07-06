export default class Pagination {

    constructor({
      activePageIndex=0,
      totalPages=0
    }={}) {
      this.activePageIndex=activePageIndex;
      this.totalPages=totalPages;
  
      this.render();
      this.addEventListeners();
    }
  
    getTemplate() {
      return `
        <div class="pagination">
          <div class="page left" data-element="nav-prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </div>
              ${this.getPages()}
              <div class="page right" data-element="nav-next">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
          </div>
      `;
    }
  
    getPages() {
      return `
        <div class="pages" data-element="pagination">
          ${new Array(this.totalPages).fill(1).map((item,index)=>{
            return this.getPageTemplate(index);
          }).join('')}
        </div>
      `;
    }
  
    getPageTemplate(pageIndex=0) {
     const isActive=pageIndex===this.activePageIndex ? 'active':'';
  
        return `
      <div
        data-element="page-link"
        class="page ${isActive}"
        data-page-index="${pageIndex}">
        ${pageIndex+1}
      </div>
     `;
    }
  
    setPage(pageIndex=0) {
      if (pageIndex===this.activePageIndex) return;
      if (pageIndex>this.totalPages-1 || pageIndex<0) return;
  
      this.dispatchEvent(pageIndex);
  
      const activePage=this.element.querySelector('.page.active');
  
      if (activePage) {
        activePage.classList.remove('active');
      }
  
      const nextActivePage=this.element.querySelector(`[data-page-index="${pageIndex}"]`);
  
      if (nextActivePage) {
        nextActivePage.classList.add('active');
      }
  
      this.activePageIndex=pageIndex;
    }
  
    nextPage() {
      const nextPageIndex=this.activePageIndex+1;
      this.setPage(nextPageIndex);
    }
  
    prevPage() {
      const prevPageIndex=this.activePageIndex-1;
      this.setPage(prevPageIndex);
    }
  
    render() {
      const wrapper=document.createElement('div');
      wrapper.innerHTML=this.getTemplate();
      this.element = wrapper.firstElementChild;
    }
  
    addEventListeners() {
      const prevPageBtn = this.element.querySelector('[data-element="nav-prev"]');
      const nextPageBtn = this.element.querySelector('[data-element="nav-next"]');
      const pagesList = this.element.querySelector('[data-element="pagination"]');
  
    //  console.log("prevPageBtn", prevPageBtn);
     // console.log("nextPageBtn", nextPageBtn);
  
  
      prevPageBtn.addEventListener('click', () => {
        this.prevPage();
      });
  
      nextPageBtn.addEventListener('click', () => {
        this.nextPage();
      });
  
      pagesList.addEventListener('click', event => {
        const pageItem = event.target.closest('.page');
  
        if (!pageItem) return;
  
        //console.log("pageItem", pageItem);
        const { pageIndex } = pageItem.dataset;
  
  
  
        this.setPage(parseInt(pageIndex, 10));
        //console.log("pageIndex", pageIndex);
      // console.log("pageItem.dataset", pageItem.dataset);
  
      });
    }
  
    dispatchEvent (pageIndex) {
      const customEvent=new CustomEvent('page-changed', {
        detail: pageIndex
      });
  
      this.element.dispatchEvent(customEvent);
  
    }
  
  }
  