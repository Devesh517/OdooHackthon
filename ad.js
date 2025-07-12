function showsection(id){
    document.querySelectorAll('.section').forEach(section => section.computedStyleMap.display='none');
    document.getElementById(id).style.display='block';
}