import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, forkJoin, from } from 'rxjs';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { switchMap, mergeMap, scan } from 'rxjs/operators';

@Component({
  selector: 'app-swapi-test',
  templateUrl: './swapi-test.component.html',
  styleUrls: ['./swapi-test.component.scss']
})
export class SwapiTestComponent implements OnInit {
  human: any;
  promised: any;
  subs: Subscription = new Subscription();
  constructor(private $http: HttpClient) { }

  ngOnInit() {
    this.subs.add(
      this.$http.get(
        'https://swapi.co/api/people/'
      ).pipe(
        map((response: any) => response.results),
        tap(response => console.log(response)),
        switchMap(results => from(results)),
        mergeMap((result: any) => this.$http.get(result.homeworld),
        (result, world) => ({...result, homeworld: world})),
        scan((accumulator, value) => {
          return [...accumulator, value];
        }, [])
      ).subscribe(
        response => this.human = response
      )
    );

    this.$http.get(
      'https://swapi.co/api/people/'
    ).toPromise().then((response: any) => response.results)
      .then((results: any) => {
        console.log('in promise', results);
        this.promised = results;
        return results;
      })
      .then(results => results.map(result => ({
        ...result,
        promise: this.$http.get(result.homeworld).toPromise()
      })))
      .then(resultsWithPromise => Promise.all(
        [
          ...resultsWithPromise.map((item, index) => item.promise.then(res => {
            return {
              ...item,
              homeworld: res
            };
          }))
        ]
      )).then(results => results.map(item => {
        delete item.promise;
        return item;
      }))
      .then( result =>  this.promised = result);
  }

}
