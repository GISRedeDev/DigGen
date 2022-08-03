function randomArray(length, max) {
    return Array.apply(null, Array(length)).map(function() {
        return Math.round(Math.random() * max);
    });
}

export function plot_xy_display(s) {
  var x = document.getElementById("plot_xy_div_id");
  
  if (s === "show"){

        x.style.display = "block";
      
  } else if (s === "hide") {

        x.style.display = "none";
    
  }else{
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }      
  }
}

export function plot_xy(c, d) {
    
    const labels = [
    '2000-01',
    '2000-02',
    '2000-03',
    '2000-04',
    '2000-05',
    '2000-06',
    '2000-07',
    '2000-11',
    '2001-01',
    '2002-01',
    '2003-01',
    '2004-01'
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: '',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: randomArray(12, 20)
    }]
  };
    
  c.data = data;
  c.update();
    
    
}


