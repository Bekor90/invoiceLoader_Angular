import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { InvoiceService } from '../../../services/invoice.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  arrayTemp:any[]=[];

  constructor(private serviceInvoice:InvoiceService) { }

  ngOnInit(): void {
    this.arrayTemp=[];
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition( objPosition =>{
      
        let lat = objPosition.coords.latitude;
        let lon = objPosition.coords.longitude;

        this.serviceInvoice.getWeather(lat+'', lon+'').subscribe( response => {
          if(response.ok){

            response.data.map((data) => {
              try{
                let obj = {
                  temp: data.main.temp,
                  date: data.dt_txt
                }
                this.arrayTemp.push(obj);
              }catch (error) {
                  console.log('error the api data has been modified');
              }
            });
           
          }
        });

      },function(objPositionError)
      {

        let text ='';
        switch (objPositionError.code)
        {
          case objPositionError.PERMISSION_DENIED:
            text = "PERMISSION DENIED";
          break;
          case objPositionError.POSITION_UNAVAILABLE:
            text = "POSITION UNAVAILABLE";
          break;
          case objPositionError.TIMEOUT:
            text = "It took too long to answer the service";
          break;
          default:
            text = "Error when obtaining weather information";
        }
        Swal.fire({
          title: 'Error when obtaining weather information',
          text: ''+text,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
        });

      }, {
        maximumAge: 75000,
        timeout: 15000
      });
    
    }else{
      Swal.fire({
        title: 'Error when obtaining weather information!',
        text: 'Sorry, your browser does not support geolocation to obtain weather information',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
      })
    }
  }


}
