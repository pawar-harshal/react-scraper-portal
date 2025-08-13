package com.example.scraper.scraperController;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.scraper.scraperService.ScraperService;

@CrossOrigin(origins = "*")
@RequestMapping("/scrape")
@RestController
public class ScrapperController {

    @GetMapping("/news")
    public List<Map<String, String>> getNews() {
        return ScraperService.scrapeNews();
    }
}